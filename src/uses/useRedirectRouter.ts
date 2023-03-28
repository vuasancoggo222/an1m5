import router from "@/router";

export default function useRedirectRouter() {
  const redirectRouter = (path: string) => {
    router.push(path);
  };
  const redirectByTag = (tag: string) => router.push(`/filter/generes?type=${tag}`);
  return {
    redirectRouter,
    redirectByTag
  };
};
