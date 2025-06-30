import { HelmetProvider } from "react-helmet-async"
import { AppRouter } from "./routes/AppRouter"
import { ThemeProvider } from "./providers/ThemeProvider"
import { Provider } from "react-redux"
import { store } from './redux/store';
import { SideBarProvider } from "./providers/SideBarProvider";

export const AppHookContainer = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SideBarProvider>
          <HelmetProvider>
            <AppRouter />
          </HelmetProvider>
        </SideBarProvider>
      </ThemeProvider>
    </Provider>
  )
}