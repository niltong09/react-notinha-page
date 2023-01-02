import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import axios from 'axios'

// 6LfLAscjAAAAAH5dwyY2SXpB4XZ9Jmu66_UcgVQx
// endpoint

const endpoint = `https://es1410bsge.execute-api.sa-east-1.amazonaws.com/dev/send_contact`;
const initialState = {
  name: '',
  email: '',
  message: '',
  token: '',
}
export const Contact = (props) => {
  const [{ name, email, message, token }, setState] = useState(initialState)
  const [errMsg, setErrMsg] = useState('')
  const [msg, setMsg] = useState('')
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message, token)
    axios.post(endpoint, {
      name,
      email,
      message,
      token
    }).catch((err) => {
      console.log('error on request', err);
      setMsg('')
      setErrMsg(`Erro ao enviar contato: ${err}`)
    }).then(() => {
      setErrMsg('')
      setMsg(`Contato enviado com sucesso, aguarde nosso retorno.`)
      clearState();
    })
  }
  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Entre em contato</h2>
                <p>
                  Preencha o formulário que retornaremos seu contato o mais breve possível.
                </p>
              </div>
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        className='form-control'
                        placeholder='Nome Completo'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        className='form-control'
                        placeholder='Email'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    value={message}
                    className='form-control'
                    rows='4'
                    placeholder='Mensagem'
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'>
                    {errMsg}
                  </p>
                </div>
                <ReCAPTCHA
                  sitekey='6LfLAscjAAAAAH5dwyY2SXpB4XZ9Jmu66_UcgVQx'
                  onChange={(token) => {
                    console.log('token', token)
                    setState((prevState) => ({ ...prevState, token }))
                  }
                  }
                  />
                <div id='success'>{msg}</div>
                <button type='submit' 
                  disabled={!token || !email || !name || !message}
                  className='btn btn-custom btn-lg'>
                  Enviar
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>Informações de contato</h3>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                {props.data ? props.data.email : 'loading'}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2022 Todos os direitos reservados a NGB Tecnologia da Informação
          </p>
        </div>
      </div>
    </div>
  )
}
