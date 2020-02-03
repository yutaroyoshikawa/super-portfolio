import React, { useRef, useState, useEffect } from "react";
import { NextPage } from "next";
import styled, { css } from "styled-components";
import SlideInType from "../components/SlideInType";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import Skill from "../components/Skill";
import Error from "./_error";
import Loading from "../components/Loading";
import { CSSTransition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";

interface Data {
  readonly name: string;
  readonly val: number;
}

const GET_SKILLS = gql`
  {
    getSkills {
      name
      val
    }
  }
`;

const About: NextPage = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<"intro" | "skills">("intro");
  const { data, error, loading } = useQuery<{ getSkills: Data[] }>(GET_SKILLS);

  useEffect(() => {
    const judgeScroll = (e: WheelEvent) => {
      setIsOpenInfo(e.deltaY > 0);
    };

    wrapRef.current.addEventListener(
      "wheel",
      e => {
        judgeScroll(e);
      },
      {
        passive: false
      }
    );

    return () => {
      wrapRef.current.removeEventListener("wheel", e => {
        judgeScroll(e);
      });
    };
  }, []);

  if (error) {
    return <Error statusCode={500} />;
  }

  return (
    <>
      <Entire ref={wrapRef}>
        <TopWrapper isOpenInfo={isOpenInfo}>
          <Name>
            <SlideInType content="Yutaro" baseDelay={300} />
          </Name>
          <Name>
            <SlideInType content="Yoshikawa" baseDelay={300} />
          </Name>
        </TopWrapper>
        <CSSTransition in={isOpenInfo} timeout={400} unmountOnExit={true}>
          {status => (
            <MyInfoWrapper transitionStatus={status}>
              <Closer onClick={() => setIsOpenInfo(false)}>閉じる</Closer>
              <CSSTransition
                in={selectedMenu === "intro"}
                timeout={400}
                unmountOnExit={true}
              >
                {status => (
                  <SelfIntroWrapper transitionStatus={status}>
                    <SelfIntro>
                      私は「ワクワクは原動力だ」というテーマのもと日々ITを勉強しています。
                      <br />
                      誰かが何か行動を起こすとき、それにはそこにワクワクするものドキドキするものがあるからではないでしょうか。
                      <br />
                      私は、人にそう感じてもらえるものを生み出したいと考えています。
                    </SelfIntro>
                  </SelfIntroWrapper>
                )}
              </CSSTransition>
              <CSSTransition
                in={selectedMenu === "skills"}
                timeout={400}
                unmountOnExit={true}
              >
                {status => (
                  <MySkillsWrapper transitionStatus={status}>
                    <MySkills>
                      {loading && <Loading />}
                      {!loading && !error && <Skill skills={data.getSkills} />}
                    </MySkills>
                  </MySkillsWrapper>
                )}
              </CSSTransition>
              <AboutMenuWrapper>
                <AboutMenu>
                  <Intro
                    onClick={() => setSelectedMenu("intro")}
                    isSelected={selectedMenu === "intro"}
                  >
                    Intro
                  </Intro>
                  <Slills
                    onClick={() => setSelectedMenu("skills")}
                    isSelected={selectedMenu === "skills"}
                  >
                    Skills
                  </Slills>
                </AboutMenu>
              </AboutMenuWrapper>
            </MyInfoWrapper>
          )}
        </CSSTransition>
      </Entire>
    </>
  );
};

export default About;

const Entire = styled.div`
  ${{
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "rgba(253, 172, 167, 1)"
  }}
  @media screen and (min-width: 1024px) {
    ${{
      alignItems: "center"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      alignItems: "flex-start"
    }}
  }
`;

interface TopWrapperProps {
  isOpenInfo: boolean;
}

const TopWrapper = styled.h1`
${{
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  background: "rgba(253, 172, 167, 1)",
  transition: "all 400ms linear"
}}
  filter: ${(props: TopWrapperProps) =>
    props.isOpenInfo ? "blur(10px)" : "blur(0px)"};
@media screen and (min-width: 1024px){
${{
  alignItems: "center"
}}
}
@media screen and (max-width: 480px){
${{
  alignItems: "flex-start",
  flexDirection: "column",
  flexWrap: "wrap",
  marginLeft: "20px"
}}
}
`;

const Name = styled.span`
  ${{
    overflowY: "hidden",
    display: "inline-block",
    color: "#FFF",
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "5px"
  }}
  @media screen and (min-width: 1024px) {
    ${{
      fontSize: "5vw"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      fontSize: "15vw",
      padding: "10px 0"
    }}
  }
`;

const MyInfoWrapper = styled.div`
  ${(props: { transitionStatus: TransitionStatus }) => {
    switch (props.transitionStatus) {
      case "entering":
        return css`
          opacity: 0.1;
          transform: translateY(100px) scale(0.98);
        `;
      case "entered":
        return css`
          opacity: 1;
          transform: translateY(0px) scale(1);
          transition: all 400ms ease-out;
        `;
      case "exited":
        return css`
          opacity: 1;
          transform: translateY(0px) scale(1);
        `;
      case "exiting":
        return css`
          opacity: 0.1;
          transform: translateY(100px) scale(0.98);
          transition: all 400ms ease-out;
        `;
    }
  }}

  ${{
    width: "100vw",
    height: "100vh",
    paddingTop: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.1)",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,
    overflowY: "auto"
  }}
`;

const Closer = styled.div`
  ${{
    width: "100vw",
    height: "100px",
    position: "fixed",
    left: "0",
    display: "flex",
    justifyContent: "center",
    zIndex: 10
  }}
  @media screen and (min-width: 1024px) {
    ${{
      top: "100px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      top: "30px"
    }}
  }
`;

const SelfIntroWrapper = styled.section`
  ${(props: { transitionStatus: TransitionStatus }) => {
    switch (props.transitionStatus) {
      case "entering":
        return css`
          opacity: 0.1;
          transform: translateY(100px) skewX(-10deg);
        `;
      case "entered":
        return css`
          opacity: 1;
          transform: translateY(0px);
          transition: all 400ms ease-out;
        `;
      case "exited":
        return css`
          opacity: 1;
          transform: translateY(0px);
        `;
      case "exiting":
        return css`
          opacity: 0.1;
          transform: translateY(-100px) skewX(10deg);
          transition: all 400ms ease-out;
        `;
    }
  }}

  ${{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0
  }}
  @media screen and (min-width: 1024px) {
    ${{
      width: "100vw"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      width: "90vw"
    }}
  }
`;

const SelfIntro = styled.p`
  ${{
    color: "#555",
    letterSpacing: "3px",
    textIndent: "calc(1em + 3px)"
  }}
  font-family: 'Noto Serif TC', serif;
  @media screen and (min-width: 1024px) {
    ${{
      fontSize: "20px",
      lineHeight: "40px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      fontSize: "16px",
      lineHeight: "32px"
    }}
  }
`;

const MySkillsWrapper = styled.section`
  ${(props: { transitionStatus: TransitionStatus }) => {
    switch (props.transitionStatus) {
      case "entering":
        return css`
          opacity: 0.1;
          transform: translateY(-100px) skewX(10deg);
        `;
      case "entered":
        return css`
          opacity: 1;
          transform: translateY(0px);
          transition: all 400ms ease-out;
        `;
      case "exited":
        return css`
          opacity: 1;
          transform: translateY(0px);
        `;
      case "exiting":
        return css`
          opacity: 0.1;
          transform: translateY(100px) skewX(-10deg);
          transition: all 400ms ease-out;
        `;
    }
  }}

  ${{
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0
  }}
`;

const MySkills = styled.div``;

const AboutMenuWrapper = styled.div`
  ${{
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    position: "fixed"
  }}
  @media screen and (min-width: 1024px) {
    ${{
      bottom: "100px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      bottom: "30px"
    }}
  }
`;

const AboutMenu = styled.div`
  ${{
    border: "solid 1px #555",
    borderRadius: "25px",
    padding: "5px"
  }}
`;

const button = css`
  ${{
    padding: "5px 30px",
    fontSize: "20px",
    transition: "all 200ms ease-out",
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "3px"
  }}
  &:hover {
    ${{
      background: "#000",
      color: "#FFF"
    }}
  }
`;

const Intro = styled.button`
${button}
${{
  borderRadius: "20px 0px 0px 20px",
  outline: "none",
  cursor: "pointer"
}}
${(props: { isSelected: boolean }) =>
  props.isSelected &&
  css`
    background: #000;
    color: #fff;
  `}
`;

const Slills = styled.button`
${button}
${{
  borderRadius: "0px 20px 20px 0px",
  outline: "none",
  cursor: "pointer"
}}
${(props: { isSelected: boolean }) =>
  props.isSelected &&
  css`
    background: #000;
    color: #fff;
  `}
`;
