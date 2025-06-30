import { SignInForm } from "../../components/auth/SignInForm"
import { PageMeta } from "../../components/common/PageMeta"
import { AuthLayout } from "../../components/layout/AuthLayout"

export const SignIn = () => {
  return (
    <>
      <PageMeta
      title="FULLDATA | Iniciar Sesión"
      description="Accede a tu cuenta de FULLDATA para gestionar contratistas, registrar materiales y visualizar estadísticas. Tu información está segura con nosotros."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  )
}