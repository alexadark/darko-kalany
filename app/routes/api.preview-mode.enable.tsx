import { validatePreviewUrl } from "@sanity/preview-url-secret";
import type { ClientPerspective } from "@sanity/client";
import { client } from "@/sanity/lib/client";
import { getSession, commitSession } from "~/sanity/session";
import type { Route } from "./+types/api.preview-mode.enable";

export async function loader({ request }: Route.LoaderArgs) {
  const token = process.env.SANITY_API_READ_TOKEN;

  if (!token) {
    throw new Response(
      "SANITY_API_READ_TOKEN environment variable is not set. Create a .env file with your Sanity read token.",
      { status: 500 }
    );
  }

  // The preview-url-secret library lets you confirm
  // that the preview command is coming from Studio.
  const clientWithToken = client.withConfig({ token });
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response("Invalid preview URL", { status: 401 });
  }

  // Get or create session
  const session = await getSession(request.headers.get("Cookie"));

  // Enable preview mode
  session.set("previewMode", true);

  // Get perspective from URL query params
  const url = new URL(request.url);
  const perspectiveParam = url.searchParams.get("sanity-preview-perspective");
  const perspective: ClientPerspective = perspectiveParam as ClientPerspective;
  session.set("perspective", perspective);

  return new Response(null, {
    status: 307,
    headers: {
      Location: redirectTo,
      "Set-Cookie": await commitSession(session),
    },
  });
}
