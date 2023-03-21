import router from "@/router";

export default function useRedirectRouter() {
  const redirectRouter = (path: string) => {
    router.push(path);
  };

  return {
    redirectRouter,
  };
};
