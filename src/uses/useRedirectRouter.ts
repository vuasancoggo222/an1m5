import router from "@/router";

export default function useRedirectRouter() {
  const redirectRouter = (path: string) => {
    router.push(path);
  };
  const redirectByTag = (tag: string,mediaType : string) => router.push(`/filter/genres?type=${tag}&mediaType=${mediaType}`);
  return {
    redirectRouter,
    redirectByTag
  };
};
