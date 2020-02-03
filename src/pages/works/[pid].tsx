import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import styled, { css, keyframes } from "styled-components";
import { NextPage } from "next";
import Head from "next/head";
import Error from "../_error";
import Loading from "../../components/Loading";
import WorksTitle from "../../components/WorksTitle";

interface Data {
  readonly title: string;
  readonly text: string;
  readonly thumb: string;
  readonly url: string;
  readonly images: string[];
  readonly tags: string[];
}

const useWorks = () => {
  const router = useRouter();
  const title = router.query.pid;

  const GET_WORKS = gql`
{
  getWork(title: "${title}") {
    title
    text
    thumb
    tags
    url
    images
  }
}
`;
  const ref = useRef<HTMLElement>(null);
  const { data, error, loading } = useQuery<{ getWork: Data }>(GET_WORKS);
  const [isEffect, setIsEffect] = useState<boolean>(false);

  const judgeScroll = () => {
    const isTop = ref.current.scrollTop > 50;
    setIsEffect(isTop);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scroll", judgeScroll);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", judgeScroll);
      }
    };
  }, []);

  return {
    data,
    error,
    loading,
    isEffect,
    imgRef: ref
  };
};

const Works: NextPage = () => {
  const { data, error, loading, isEffect, imgRef } = useWorks();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error statusCode={404} title="404 ページが見つかりません。" />;
  }

  const payload = data.getWork;

  return (
    <>
      {payload.thumb && (
        <Background imageUrl={payload.thumb} isEffect={isEffect} />
      )}
      <Entire ref={imgRef}>
        <Head>
          <title>吉川勇太郎のポートフォリオ｜{payload.title}</title>
        </Head>
        <TopSection isEffect={isEffect}>
          <div>
            <TagWrap>
              {payload.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagWrap>
            <WorksTitleWrapper>
              <WorksTitle content={payload.title} />
            </WorksTitleWrapper>
          </div>
        </TopSection>
        <MainContentWrapper>
          <MainContent>
            <Paragraph>{payload.text}</Paragraph>
            {payload.images &&
              payload.images.map((url, i) => (
                <figure key={i}>
                  <Images src={url} alt={`image${i}`} />
                </figure>
              ))}
            {payload.url && (
              <UrlWrapper>
                <Url href={payload.url} target="_blank">
                  Go to page
                </Url>
              </UrlWrapper>
            )}
          </MainContent>
        </MainContentWrapper>
      </Entire>
    </>
  );
};

export default Works;

const fadeIn = keyframes`
from {
  opacity: 0;
},
to {
  opacity: 1;
}
`;

interface BackgroundProps {
  imageUrl: string;
  isEffect: boolean;
}

const Background = styled.div`
${{
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 78,
  backgroundSize: "cover",
  transition: "all 400ms ease"
}}
  animation: ${fadeIn} 600ms ease;
  ${(props: BackgroundProps) =>
    props.isEffect &&
    css`
      filter: blur(10px);
    `}
  ${(props: BackgroundProps) =>
    props.imageUrl &&
    css`
    background: url('${props.imageUrl}') no-repeat center;
  `}
`;

const Entire = styled.main`
${{
  width: "100vw",
  height: "100vh",
  overflowY: "scroll",
  background:
    "linear-gradient(rgba(253, 172, 167, 0.6), rgba(253, 172, 167, 1))",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 79
}}
animation: ${fadeIn} 600ms ease;
-webkit-overflow-scrolling: touch;
`;

interface TopSectionProps {
  isEffect: boolean;
}

const TopSection = styled.section`
  ${{
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 80,
    transition: "all 400ms ease",
    overflow: "scroll"
  }}
  ${(props: TopSectionProps) =>
    props.isEffect &&
    css`
      filter: blur(10px);
    `}
`;

const WorksTitleWrapper = styled.div`
  ${{
    display: "flex",
    justifyContent: "center"
  }}
  @media screen and (min-width: 1024px) {
    ${{
      width: "100vw",
      marginBottom: "100px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      marginBottom: "100px"
    }}
  }
`;

const MainContentWrapper = styled.section`
  ${{
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    position: "relative",
    zIndex: 81,
    paddingTop: "100vh"
  }}
`;

const MainContent = styled.div`
  @media screen and (min-width: 1024px) {
    ${{
      width: "1020px",
      height: "100vh",
      padding: "100px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      width: "90vw",
      height: "100vh"
    }}
  }
`;

const Paragraph = styled.p`
  ${{
    color: "#FFF",
    textIndent: "calc(1em + 3px)"
  }}
  @media screen and (min-width: 1024px) {
    ${{
      fontSize: "25px",
      lineHeight: "50px",
      letterSpacing: "3px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      fontSize: "17px",
      lineHeight: "30px",
      letterSpacing: "3px"
    }}
  }
`;

const Tag = styled.span`
  ${{
    display: "inner-block",
    textAlign: "center",
    color: "#FFF",
    border: "solid 1px #FFF",
    padding: "5px 10px",
    borderRadius: "50px"
  }}
`;

const TagWrap = styled.div`
  ${{
    width: "100vw",
    display: "flex",
    marginBottom: "50px"
    // overflow: 'scroll'
  }}
  @media screen and (min-width: 1024px) {
    ${{
      justifyContent: "center"
    }}
  }
`;

const UrlWrapper = styled.div`
  ${{
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }}
`;

const Url = styled.a`
  ${{
    color: "#FFF",
    display: "inline-block",
    borderRadius: "50px",
    border: "solid #FFF 2px",
    textAlign: "center",
    fontSize: "20px",
    padding: "10px 50px",
    margin: "40px 0",
    transition: "all 600ms ease"
  }}
  &:hover {
    ${{
      color: "#000",
      background: "#FFF"
    }}
  }
`;

const Images = styled.img`
  ${{
    width: "100%",
    margin: "100px 0"
  }}
`;
