import { loadQuery, setServerClient } from "@sanity/react-loader";
import { client } from "@/sanity/lib/client";

const serverClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
});
setServerClient(serverClient);

export { loadQuery };
