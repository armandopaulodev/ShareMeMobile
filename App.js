import 'react-native-gesture-handler';
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import * as React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import {
  Appbar,
  Banner,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  Card,
  Avatar,
  Button,
  Text,
  Portal,
  Dialog,
} from "react-native-paper";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  return (
    <>
      <PaperProvider theme={paperTheme}>
        <Appbar.Header>
          {/* <Appbar.BackAction onPress={() => {}} /> */}
          <Appbar.Content title="ShareMe" />
          <Appbar.Action icon="calendar" onPress={() => {}} />
          <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
        <Banner
          visible={visible}
          actions={[
            {
              label: "Fix it",
              onPress: () => setVisible(false),
            },
            {
              label: "Learn more",
              onPress: () => setVisible(false),
            },
          ]}
          icon={({ size }) => (
            <Image
              source={{
                uri: "https://images.pexels.com/photos/4064969/pexels-photo-4064969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
              style={{
                width: size,
                height: size,
              }}
            />
          )}
        >
          Esse banner sera exibido apenas uma vez
        </Banner>

        <ScrollView
          style={{ marginLeft: "2%", marginRight: "2%", Height: "100%" }}
        >
          <Card style={{ marginTop: "2%" }} onPress={()=>setVisible(!visible)}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Content>
              <Text variant="titleLarge">Card title</Text>
              <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <Button onPress={() => {}}>Cancel</Button>
              <Button onPress={() => {}}>Ok</Button>
            </Card.Actions>
          </Card>
          <Card style={{ marginTop: "2%" }}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Content>
              <Text variant="titleLarge">Card title</Text>
              <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <Button onPress={() => {}}>Cancel</Button>
              <Button onPress={() => {}}>Ok</Button>
            </Card.Actions>
          </Card>

          <Card style={{ marginTop: "2%" }}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Content>
              <Text variant="titleLarge">Card title</Text>
              <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <Button onPress={() => {}}>Cancel</Button>
              <Button onPress={() => {}}>Ok</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor:'red' }}>
            <Dialog.Title>Alerta de Bateria fraca</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Apenas um exemplo de modal</Text>
            </Dialog.Content>
            <Dialog.Actions>
               <Button onPress={hideDialog}>Cancelar</Button>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
