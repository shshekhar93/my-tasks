import React, { JSX } from 'react';
import { StyleObject, useStyletron } from 'styletron-react';
import { BREAKPOINTS } from './breakpoints';

type FlexDirection = StyleObject['flexDirection'];
type FlexJustifyContent = StyleObject['justifyContent'];
type FlexAlignItems = StyleObject['alignItems'];

type FlexProps = {
  flexDirection?: FlexDirection | FlexDirection[];
  justifyContent?: FlexJustifyContent | FlexJustifyContent[];
  alignItems?: FlexAlignItems | FlexAlignItems[];
  wrap?: boolean;
  gap?: string | string[];
};

export function Flex({
  children,
  flexDirection = 'row',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  wrap,
  gap = '0',
  ...props
}: JSX.IntrinsicElements['div'] & FlexProps) {
  const [css] = useStyletron();
  const flexDirectionValue = Array.isArray(flexDirection) ? flexDirection : [flexDirection];
  const justifyContentValue = Array.isArray(justifyContent) ? justifyContent : [justifyContent];
  const alignItemsValue = Array.isArray(alignItems) ? alignItems : [alignItems];
  const gapValue = Array.isArray(gap) ? gap : [gap];

  return (
    <div
      {...props}
      className={[props.className, css({
        display: 'flex',
        flexDirection: flexDirectionValue[0],
        justifyContent: justifyContentValue[0],
        alignItems: alignItemsValue[0],
        gap: gapValue[0],
        flexWrap: wrap === true ? 'wrap' : undefined,

        [BREAKPOINTS.small]: {
          flexDirection: flexDirectionValue[1] ?? flexDirectionValue[0],
          justifyContent: justifyContentValue[1] ?? justifyContentValue[0],
          alignItems: alignItemsValue[1] ?? alignItemsValue[0],
          gap: gapValue[1] ?? gapValue[0],
        },
      })].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
