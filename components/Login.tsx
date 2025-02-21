import {
  useEmbeddedEthereumWallet,
  useEmbeddedSolanaWallet,
  useLoginWithOAuth,
} from "@privy-io/expo";
import { usePrivy } from "@privy-io/expo";
import { Button, Text, View } from "react-native";

export default function Login() {
  const { isReady, user, logout } = usePrivy();
  const { login, state: loginState } = useLoginWithOAuth({
    onSuccess: () => {
      console.log("Success!!");
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  const {
    wallets: solanaWallets,
    status: solanaStatus,
    create: createSolanaWallet,
  } = useEmbeddedSolanaWallet();

  //useEmbeddedEthereumWallet does not have the status property????
  const { wallets: ethereumWallets, create: createEthereumWallet } =
    useEmbeddedEthereumWallet();

  console.log("solanaWallets", solanaWallets.length, solanaWallets);
  console.log("ethereumWallets", ethereumWallets.length, ethereumWallets);

  if (user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          User
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          {
            user.linked_accounts.find(
              (account) => account.type === "google_oauth"
            )?.email
          }
        </Text>

        {solanaStatus === "not-created" ? (
          <Button
            title="Create Wallet"
            onPress={async () => {
              await createSolanaWallet();
            }}
          />
        ) : null}

        {solanaStatus === "connected" ? (
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Wallet Created
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              {solanaWallets[0].address}
            </Text>
            <Button title="Logout" onPress={() => logout()} />
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Login" onPress={() => login({ provider: "google" })} />
    </View>
  );
}
