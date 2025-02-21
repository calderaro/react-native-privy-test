import React from "react";
import { StyleSheet } from "react-native";
import { PrivyProvider } from "@privy-io/expo";
import Login from "./components/Login";

export default function App() {
  return (
    <PrivyProvider
      appId={""}
      clientId={""}
      config={{
        embedded: {
          ethereum: {
            createOnLogin: "all-users",
          },
          solana: {
            createOnLogin: "all-users",
          },
        },
      }}
    >
      <Login />
    </PrivyProvider>
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
