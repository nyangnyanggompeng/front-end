import { css } from '@emotion/react';
import { FormContainer } from './SignUp.styles';

export const NicknameContainer = css(FormContainer, {
  gridTemplateColumns:
    'repeat(auto-fill, minmax(49rem, auto) minmax(10.7rem, auto))',
});
