import React from 'react';
import styled from 'styled-components';

import { Status, TLog } from 'utils/wallet/types/types';

import { RED, YELLOW, GREEN, BLUE, PURPLE, BLACK } from 'utils/styles/colors';

// =============================================================================
// Styled Components
// =============================================================================

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.5;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledSpan = styled.span<{ status: Status }>`
  color: ${(props) => {
    switch (props.status) {
      case 'success':
        return GREEN;
      case 'warning':
        return YELLOW;
      case 'error':
        return RED;
      case 'info':
        return BLUE;
      default:
        return BLACK;
    }
  }};
  margin-right: 5px;
`;

const Method = styled.p`
  color: ${PURPLE};
  margin-right: 10px;
`;

const Message = styled.p`
  overflow-wrap: break-word;
`;

// =============================================================================
// Main Component
// =============================================================================

const Log = React.memo((props: TLog) => (
  <Column>
    <Row>
      <StyledSpan status={props.status}>
        {'>'} {props.status}
      </StyledSpan>
      {props.method && <Method>[{props.method}]</Method>}
    </Row>
    <Message>{props.message}</Message>
    {props.messageTwo && <Message>{props.messageTwo}</Message>}
  </Column>
));

export default Log;
