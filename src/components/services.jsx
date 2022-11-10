import { formatNumber } from "../formatters"

export const Services = (props) => {
  return (
    <div id='services' className='text-center'>
      <div className='container'>
        <div className='section-title'>
          <h2>Nossos planos</h2>
          <p>
            Confira nossos planos, veja se cabe no seu bolso.
          </p>
        </div>
        <div className='row'>
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-4'>
                  {' '}
                  <i className={d.icon}></i>
                  <div className='service-desc'>
                    <h3>{d.name}</h3>
                    {d.text && <p>{d.text}</p>}
                    <div className="col-xs-12 list-style" style={{ minHeight: "40vh"}}>
                      <div className="col-xs-12">
                        <ul>
                          {d.itens
                            ? d.itens.map((d, i) => (
                                <li key={`${d}-${i}`}>{d}</li>
                              ))
                            : "loading"}
                        </ul>
                      </div>
                    </div>
                    {d.preco && <h3>R$ {formatNumber(d.preco)}/mês</h3>}
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  )
}
