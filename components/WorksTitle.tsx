import React from "react";
import SlideInType from "./SlideInType";
import styled from "styled-components";

interface Props {
  content: string;
}

const WorksTitle: React.FC<Props> = props => {
  const renderTitle = (content: string) => {
    const length = content.length;
    if (length <= 10) {
      return (
        <TitleWrapper>
          <SlideInType content={content} baseDelay={400} />
        </TitleWrapper>
      );
    } else {
      const loop = length / 10;
      const data: string[] = [];
      let min = 0;
      if (length % 10 === 0) {
        [...new Array(loop)].map((_, i) => {
          const index = i + 1;
          data.push(content.slice(min, 10 * index));
          min = 10 * index;
        });
      } else {
        [...new Array(loop)].map((_, i) => {
          const index = i + 1;
          data.push(content.slice(min, 10 * index));
          min = 10 * index;
        });
        data.push(content.slice(min));
      }
      return data.map((data, i) => (
        <TitleWrapper key={i}>
          <SlideInType content={data} baseDelay={400} />
        </TitleWrapper>
      ));
    }
  };

  return <Title>{renderTitle(props.content)}</Title>;
};

export default WorksTitle;

const TitleWrapper = styled.div`
  ${{
    overflowY: "hidden"
  }}
`;

const Title = styled.h1`
  ${{
    color: "#FFF",
    fontFamily: "Cantata One, Noto Serif TC, serif"
  }}
  @media screen and (min-width: 1024px) {
    ${{
      fontSize: "5vw"
    }}
  }
  @media screen and (max-width: 480px) {
    ${{
      fontSize: "30px"
    }}
  }
`;
