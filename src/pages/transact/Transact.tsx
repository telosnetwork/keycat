import React, { useCallback, useMemo, useState, useEffect } from 'react'
import TransactPayload from './TransactPayload'
import Submit from 'design/moles/fields/Submit'
import { getSearchParams, fromBinary, toBinary } from 'utils/utils'
import AccountField from 'design/moles/fields/AccountField'
import PasswordField from 'design/moles/fields/PasswordField'
import CardLayout from 'design/layouts/CardLayout'
import { useTransact } from 'hooks/transactHooks'
import { Fields } from 'design/atoms/Input'
import FieldError from 'design/moles/fields/FieldError'
import { Form } from 'design/moles/form/Form'
import { dashCaseToCamelCase } from 'utils/stringUtils'
import TransactMeta from './TransactMeta'
import JsonViewer from 'design/moles/JsonViewer'
import { useStore } from 'store/store'
import { Link } from '@reach/router'
import styled from 'styled-components'

interface Props {
  path: string
}

const HasErrorDiv = styled.div`
  margin-top: 15px;
  font-size: 13px;
  a {
    cursor: pointer;
    text-decoration: none;
  }
`;

const Transact: React.SFC<Props> = ({ path }) => {
  const { account, payload } = getSearchParams()
  const {
    config: {
      blockchain: { plugin },
    },
  } = useStore()
  const [hasError, setHasError] = useState(true);

  const { mode, title } = useMemo(() => {
    const mode = dashCaseToCamelCase(path.slice(1))

    const titles = {
      sign: 'Sign Transaction',
      signTransaction: 'Sign Transaction',
      signArbitraryData: 'Sign arbitrary data',
      transact: 'Sign Transaction',
    }

    return {
      mode,
      title: titles[mode],
    }
  }, [])

  const transact = useTransact(mode)

  const params = useMemo(() => {
    const decodedPayload = decodeURIComponent(payload as string)
    const intermediate = atob(decodedPayload)
    const args = fromBinary(intermediate)
    console.log('args', JSON.parse(args));
    return JSON.parse(args)
  }, [])

  const Payload = useMemo(() => {
    const decodedPayload = decodeURIComponent(payload as string)
    const intermediate = atob(decodedPayload)
    const args = fromBinary(intermediate)
    const data = JSON.parse(args)

    if (mode === 'signArbitraryData' || plugin !== 'eos') {
      return <JsonViewer src={data} />
    }

    if (mode === 'signTransaction') {
      return <TransactPayload payload={data[0]} />
    }

    return <TransactPayload payload={data[0]} />
  }, [])

  const handleSubmit = useCallback(({ values, ...formProps }) => {
    transact.transact({
      values: {
        params,
        ...values,
      },
      ...formProps,
    })
  }, [])

  const handleClose = () => {
    window.close()
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
    <CardLayout title={title}>
      <TransactMeta account={account} />
      <Form method="post" noValidate onSubmit={handleSubmit}>
        <Fields>
          {Payload}
          <AccountField defaultValue={account as string} />
          <PasswordField hidden={!hasError} id="password" />
          <FieldError name="account" />
          <FieldError name="password" />
          <HasErrorDiv>having Problem? Click here to <a onClick={handleHasError} >re-enter keys</a>.</HasErrorDiv>
        </Fields>
        <Submit />
        <div>
          <Link to={'#'} onClick={handleClose} className="close-button">
            Close
          </Link>
        </div>
      </Form>
    </CardLayout>
  )
}

export default Transact
