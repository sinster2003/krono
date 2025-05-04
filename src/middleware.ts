import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/*
const publicRoutes = ["/", "/api/clerk-webhook", "/api/drive-activity/notification"];
const ignoredRoutes = [
    "/api/auth/callback/discord",
    "/api/auth/callback/slack",
    "/api/auth/callback/notion",
    "/api/flow",
    "/api/cron/wait"
];
*/

const isPublicRoutes = createRouteMatcher([
    "/", "/api/clerk-webhook", "/api/drive-activity/notification", "/sign-in(.*)", "/sign-up(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
    try {
        if(!isPublicRoutes(req)) {
            await auth.protect(); // protect the route if not public
        }

        return NextResponse.next();
    }
    catch(error) {
        console.error("User not signed in", error);
        return NextResponse.redirect(new URL('/', req.url));
    }
});

export const config = {
    matcher: [
        '/(api|trpc)(.*)',

        // Match everything except:
        // - Next.js internals
        // - Static assets
        // - Ignored routes
        '/((?!_next|.*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|api/auth/callback/discord|api/auth/callback/slack|api/auth/callback/notion|api/flow|api/cron/wait).*)',
    ],
};