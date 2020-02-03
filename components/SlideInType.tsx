import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  content: string;
  baseDelay?: number;
}

const SlideInType: React.FC<Props> = props => {
  return (
    <div>
      {props.content.split("").map((chara, i) => (
        <SplitType
          key={i}
          delay={props.baseDelay ? i * 50 + props.baseDelay : i * 50}
        >
          {chara}
        </SplitType>
      ))}
    </div>
  );
};

export default SlideInType;

const slideIn = keyframes`
  from {
    transform: translate(10px, 100%) skewX(20deg);
  }
  to {
    transform: translate(0, 0%) skewX(0deg);
  }
`;

interface SlideTypeProps {
  delay: number;
}

const SplitType = styled.span`
  display: inline-block;
  transform: translate(0, 100%);
  animation: ${slideIn} 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    ${(props: SlideTypeProps) => props.delay}ms 1 forwards;
`;
