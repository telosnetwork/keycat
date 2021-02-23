import React, { useEffect, useState, useRef } from 'react'
import { Link, navigate } from '@reach/router'
import Submit from 'design/moles/fields/Submit'
import Create from 'design/moles/fields/Create'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks'
import CardLayout from 'design/layouts/CardLayout'
import { Fields } from 'design/atoms/Input'
import FieldError from 'design/moles/fields/FieldError'
import AccountField from 'design/moles/fields/AccountField'
import { Form } from 'design/moles/form/Form'
import { appendSearchParamsToUrl } from 'utils/utils'
import styled from 'styled-components';

const HasErrorDiv = styled.div`
  margin-top: 15px;
  font-size: 13px;
  a {
    cursor: pointer;
    text-decoration: none;
  }
`;

const SigninAccount = props => {
  const { signin } = useSignin()
  const [hasError, setHasError] = useState(true);

  const onClickCreateNewAccount = () => {
    navigate(appendSearchParamsToUrl('/create'))
  }

  const handleHasError = () => {
    setHasError(true);
  };

  const onAnimationStart = ({ target, animationName }) => {
    switch (animationName) {
      case 'onAutoFillStart':
        setHasError(false);
    }
  };

  useEffect(() => {
    document.getElementById('password').addEventListener('animationstart', onAnimationStart);
  }, []);

  return (
    <CardLayout title={`Sign-in`}>
      <Form action="post" noValidate onSubmit={signin}>
        <Fields>
          <AccountField />
          <PasswordField hidden={!hasError} id="password" />
          <FieldError name="password" />
          <HasErrorDiv>having Problem? Click here to <a onClick={handleHasError} >re-enter keys</a>.</HasErrorDiv>
        </Fields>
        <Submit help="signin" sibling={() => <Link to={appendSearchParamsToUrl('/register')}>Import Account</Link>} />
      </Form>
      <Create onClick={onClickCreateNewAccount} help="create" />
    </CardLayout>
  )
}

export default SigninAccount
