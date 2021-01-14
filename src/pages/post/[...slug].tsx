import * as React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useTranslation } from "@/lib/i18n";
import { AppShell } from "@/components/app-shell";
import { posts, Post } from "@/data/posts";
import { useRouter } from "next/router";

interface PostPageProps {
  mode: POST_MODES;
  post?: Post;
}

enum POST_MODES {
  READ,
  EDIT,
  NEW,
}

const PostPage: NextPage<PostPageProps> = ({ mode, post }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isEditing = mode === POST_MODES.EDIT || mode === POST_MODES.NEW;

  return (
    <AppShell>
      <header style={{ display: "flex", alignItems: "center" }}>
        <h1>{t("common:post")}</h1>

        {mode === POST_MODES.READ && (
          <button
            onClick={() => router.push(`/post/edit/${post.id}`)}
            style={{
              padding: "0.5rem",
              border: "2px solid black",
              marginLeft: "1rem",
            }}
          >
            {t("common:edit")}
          </button>
        )}
      </header>

      <article>
        {isEditing ? (
          <label style={{ display: "block" }}>
            {t("common:title")}
            <input
              style={{ display: "block" }}
              type="text"
              defaultValue={post.title}
            />
          </label>
        ) : (
          <h1>{post.title}</h1>
        )}

        {isEditing ? (
          <label style={{ display: "block", marginTop: "1rem" }}>
            {t("common:content")}
            <textarea
              style={{ display: "block" }}
              defaultValue={post.content}
            />
          </label>
        ) : (
          <p>{post.content}</p>
        )}
      </article>
    </AppShell>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = posts.reduce(
    (acc, post) => [
      ...acc,
      ...locales.map((locale) => ({ params: { slug: ["new"] }, locale })),
      ...locales.map((locale) => ({ params: { slug: [post.id] }, locale })),
      ...locales.map((locale) => ({
        params: { slug: ["edit", post.id] },
        locale,
      })),
    ],
    []
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context
) => {
  if (context.params.slug[0] === "new") {
    return {
      props: {
        mode: POST_MODES.NEW,
        post: {
          id: null,
          title: null,
          content: null,
        },
      },
      revalidate: false,
    };
  }

  const isEditMode = context.params.slug[0] === "edit";

  const post = posts.find(
    (post) => post.id === context.params.slug[isEditMode ? 1 : 0]
  );

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post, mode: isEditMode ? POST_MODES.EDIT : POST_MODES.READ },
    revalidate: 1,
  };
};
