import { WalletLoginManager } from "@commonmodule/wallet-login";
import { mainnet } from "@wagmi/core/chains";
import GaiaProtocolGodsArtifact from "./artifacts/GaiaProtocolGods.json" assert {
  type: "json",
};

class GaiaProtocolGodsContract {
  private address: `0x${string}` = "0x134590ACB661Da2B318BcdE6b39eF5cF8208E372";

  public async ownerOf(tokenId: bigint) {
    return await WalletLoginManager.readContract({
      chainId: mainnet.id,
      address: this.address,
      abi: GaiaProtocolGodsArtifact.abi,
      functionName: "ownerOf",
      args: [tokenId],
    }) as string;
  }
}

export default new GaiaProtocolGodsContract();
