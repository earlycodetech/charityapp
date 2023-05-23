import { NavigationContainer } from "@react-navigation/native"
import { StackNavigation } from "./screens/StackNavigation"
import { AppProvider } from "./settings/globalVariables"

export default function App () {
  return (
    <AppProvider>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
    </AppProvider>
  )
}