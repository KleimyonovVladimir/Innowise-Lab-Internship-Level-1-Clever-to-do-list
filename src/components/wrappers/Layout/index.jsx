import Header from '../../Header'

import './styles.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content">{children}</div>
    </>
  )
}

export default Layout
