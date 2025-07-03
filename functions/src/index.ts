import { setGlobalOptions } from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

export const createContractor = onCall(async (request) => {
  const { auth, data } = request;

  // Verificación de autenticación
  if (!auth) {
    throw new HttpsError(
      "unauthenticated",
      "Debes iniciar sesión para realizar esta acción."
    );
  }

  const { name, email, phone, password, isLeaderCrew, crew, createdBy } = data;

  // Validación de campos requeridos
  if (!name || !email || !password) {
    throw new HttpsError(
      "invalid-argument",
      "Faltan campos obligatorios: nombre, correo o contraseña."
    );
  }

  // Validación del rol del solicitante
  const requesterUid = auth.uid;
  const requesterDoc = await admin
    .firestore()
    .collection("usuarios")
    .doc(requesterUid)
    .get();

  if (!requesterDoc.exists || !requesterDoc.data()?.isAdmin) {
    throw new HttpsError(
      "permission-denied",
      "No tienes permisos para crear contratistas."
    );
  }

  // Validar si el correo ya está en uso
  const existingUser = await admin.auth().getUserByEmail(email).catch(() => null);
  if (existingUser) {
    throw new HttpsError(
      "already-exists",
      `El correo '${email}' ya está en uso.`
    );
  }

    const firstName = crew.trim().split(/\s+/)[0]; // solo el primer nombre

    const label: string = firstName;
    const value: string = firstName
      .toLowerCase()
      .normalize("NFD")               // elimina tildes
      .replace(/[\u0300-\u036f]/g, "") // remueve residuos
      .replace(/[^a-z0-9]/g, "");     // solo letras/números

  // Si es líder de cuadrilla, validar que no exista otra con el mismo nombre
  if (isLeaderCrew && crew) {
    const crewDoc = await admin
      .firestore()
      .collection("cuadrillas")
      .doc(value)
      .get();
    if (crewDoc.exists) {
      throw new HttpsError(
        "already-exists",
        `La cuadrilla '${label}' ya está registrada.`
      );
    }
  }

  let newUser;
  try {
    // Crear usuario en Firebase Auth
    newUser = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });
  } catch (err: any) {
    if (err.code === "auth/email-already-exists") {
      throw new HttpsError(
        "already-exists",
        `El correo '${email}' ya está en uso.`
      );
    }
    throw new HttpsError("internal", "No se pudo crear el usuario.");
  }

  // Si es líder de cuadrilla, registrar la cuadrilla
  if (isLeaderCrew && crew) {
    await admin.firestore().collection("cuadrillas").doc(value).set({
      createdBy: newUser.uid,
      name: crew,
      label,
      value,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // Guardar información del contratista en Firestore
  await admin.firestore().collection("contratistas").doc(newUser.uid).set({
    email,
    name,
    phone,
    isLeaderCrew,
    crew: label.charAt(0).toUpperCase() + label.slice(1),
    //TODO: Encriptar la contraseña antes de guardarla
    password,
    createdBy,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { success: true, uid: newUser.uid };
});


export const deleteAuthContractor = onCall(async (request) => {
  const { auth, data } = request;

    // Verificación de autenticación
  if (!auth) {
    throw new HttpsError(
      "unauthenticated",
      "Debes iniciar sesión para realizar esta acción."
    );
  }

  try {
    await admin.auth().deleteUser(data.uid);
    return { message: `Usuario ${data.uid} eliminado de Firebase Auth.` };
  } catch (error) {
    throw new HttpsError('internal', 'No se pudo eliminar el usuario.');
  }
})