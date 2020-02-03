import React, { FormEvent, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import SlideInType from "../components/SlideInType";
import Head from "next/head";
import styled, { css, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";

const SUBMIT_CONTACT = gql`
  mutation contact($title: String!, $email: String!, $content: String!) {
    contact(title: $title, email: $email, content: $content) {
      posted_at
    }
  }
`;

const Contact: NextPage = () => {
  const ref = useRef<HTMLElement>(null);

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [xindex, setXindex] = useState(0);

  const [toggleContact, { loading }] = useMutation(SUBMIT_CONTACT, {
    variables: {
      title,
      email,
      content
    }
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    toggleContact();
  };

  useEffect(() => {
    const checkcursor = (e: MouseEvent): void => {
      setXindex(e.pageX);
    };

    const checkDevicemotion = (e: DeviceMotionEvent): void => {
      setXindex(e.accelerationIncludingGravity.x);
    };

    if (ref.current) {
      ref.current.addEventListener("mousemove", checkcursor);
      ref.current.addEventListener("devicemotion", checkDevicemotion);
    }

    return (): void => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", checkcursor);
        ref.current.removeEventListener("devicemotion", checkDevicemotion);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>吉川勇太郎のポートフォリオ｜Contact</title>
      </Head>
      <Entire ref={ref}>
        <FormWrapper xindex={xindex}>
          <FormTitle>
            <SlideInType content="contact" baseDelay={300} />
          </FormTitle>
          <Form onSubmit={(e): void => handleSubmit(e)} xIndex={xindex}>
            <InputWrapper>
              <ContactTitle
                type="text"
                placeholder="title"
                value={title}
                onChange={(e): void => setTitle(e.target.value)}
                required={true}
              />
              <ContactFrom
                type="email"
                placeholder="email"
                value={email}
                onChange={(e): void => setEmail(e.target.value)}
                required={true}
              />
              <ContactContent
                placeholder="content"
                value={content}
                onChange={(e): void => setContent(e.target.value)}
                required={true}
              />
            </InputWrapper>
            <SenderWrapper>
              <Sender type="submit" disabled={!(title && content) || loading}>
                <SenderIcon icon={faPaperPlane} />
              </Sender>
            </SenderWrapper>
          </Form>
        </FormWrapper>
      </Entire>
    </>
  );
};

export default Contact;

const Entire = styled.main`
  ${{
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(138, 164, 205)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}
`;

const scaleIn = keyframes`
from {
${{
  transform: "scale(0.1)"
}}
}
to {
${{
  transform: "scale(1.0)"
}}
}
`;

const fadeIn = keyframes`
from {
${{
  opacity: 0
}}
}
to {
${{
  opacity: 1
}}
}
`;

interface FormWrapperProps {
  xindex: number;
}

const FormWrapper = styled.section`
${{
  border: "solid 2px #FFF"
}}
transform: translate(${(props: FormWrapperProps) =>
  props.xindex * 0.05}px, -30px) scale(1);
transition: all 1000ms linear;
animation: ${scaleIn} 700ms cubic-bezier(1,0,.35,1.2) 300ms 1;
@media screen and (min-width: 1024px){
${{
  width: "500px",
  height: "500px",
  borderRadius: "60px",
  padding: "20px"
}}
}
@media screen and (max-width: 480px){
${{
  width: "280px",
  height: "280px",
  borderRadius: "38px",
  padding: "20px",
  transform: "translate(-30px, -10px)"
}}
}
`;

const FormTitle = styled.h1`
  ${{
    color: "#FFF",
    display: "inline-block",
    padding: "10px",
    overflowY: "hidden",
    background: "rgb(138, 164, 205)",
    fontFamily: "Raleway, sans-serif"
  }}
  @media screen and (min-width: 1024px) {
    ${{
      fontSize: "90px",
      transform: "translate(-65px, -70px)",
      letterSpacing: "10px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      fontSize: "40px",
      transform: "translate(-35px, -50px)",
      letterSpacing: "5px"
    }}
  }
`;

interface FormProps {
  xIndex: number;
}

const Form = styled.form`
${{
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexDirection: "column",
  flexWrap: "wrap",
  opacity: 0
}}
transform: translate(${(props: FormProps) =>
  props.xIndex * 0.06}px, -30px) scale(1);
transition: all 300ms linear;
animation: ${fadeIn} 800ms ease 1200ms 1 forwards;
@media screen and (min-width: 1024px){
${{
  height: "420px"
  // transform: 'translate(60px, 0px)',
}}
}
@media screen and (max-width: 480px){
${{
  height: "270px"
  // transform: 'translate(30px, -30px)',
}}
}
`;

const InputWrapper = styled.div`
  ${{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%"
  }}
  @media screen and (min-width: 1024px) {
    ${{
      height: "280px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      height: "190px"
    }}
  }
`;

const input = css`
  ${{
    width: "100%",
    color: "#555",
    borderRadius: "20px",
    border: "solid 2px rgba(255, 255, 255, 0)",
    background: "rgba(255, 255, 255, 0.5)",
    outline: "0",
    transition: "all 300ms ease"
  }}
  &:focus {
    ${{
      boxShadow: "0 0 30px 2px rgba(0,0,0,0.2)",
      border: "solid 2px rgba(255, 255, 255, 1)",
      background: "rgba(255, 255, 255, 0.8)"
    }}
  }
  @media screen and (min-width: 1024px) {
    ${{
      fontSize: "20px",
      padding: "10px 20px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      fontSize: "15px",
      padding: "5px 10px"
    }}
  }
`;

const ContactTitle = styled.input`
  ${input}
`;

const ContactFrom = styled.input`
  ${input}
`;

const ContactContent = styled.textarea`
  ${input}
  ${{
    resize: "none"
  }}
@media screen and (min-width: 1024px) {
    ${{
      height: "110px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      height: "70px"
    }}
  }
`;

const SenderWrapper = styled.div`
  ${{
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }}
`;

const Sender = styled.button`
  ${{
    background: "rgba(253, 172, 167, 1)",
    borderRadius: "50%",
    border: "solid 2px rgba(255, 255, 255, 0)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    fontSize: "20px",
    transition: "all 500ms ease",
    boxShadow: "0 0 30px 2px rgba(0,0,0,0.2)"
  }}

  &:hover {
    background: rgba(253, 162, 157, 1);
    box-shadow: 0 0 40px 2px rgba(0, 0, 0, 0.4);
    border: solid 2px rgba(255, 255, 255, 1);
  }

  &:disabled {
    background: rgba(253, 162, 157, 1);
    cursor: not-allowed;
  }

  &:focus {
    background: rgba(253, 162, 157, 1);
    box-shadow: 0 0 40px 2px rgba(0, 0, 0, 0.4);
    border: solid 2px rgba(255, 255, 255, 1);
  }

  @media screen and (min-width: 1024px) {
    ${{
      width: "80px",
      height: "80px"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      width: "60px",
      height: "60px"
    }}
  }
`;

const SenderIcon = styled(FontAwesomeIcon)`
  ${{
    color: "#FFF",
    fontSize: "30px",
    margin: "0 0 -2px -5px"
  }}
`;
