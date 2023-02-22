import { router } from "../trpc";
import { linksRouter } from "./links";

export const appRouter = router({
  links: linksRouter,
});

export type AppRouter = typeof appRouter;
