import * as React from "react";
import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { AppShell } from "@/components/app-shell";
import { posts, Post } from "@/data/posts";

interface IndexProps {
  posts?: Post[];
}

const Index: NextPage<IndexProps> = ({ posts }) => {
  const { t } = useTranslation();

  return (
    <AppShell>
      <h1>{t("common:posts")}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
};

export default Index;

export const getStaticProps: GetStaticProps<IndexProps> = async () => ({
  props: { posts },
  revalidate: 1,
});
