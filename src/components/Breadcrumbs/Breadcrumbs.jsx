import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();   
  const pathnames = location.pathname.split('/').filter((x) => x);    
  if (pathnames.length === 0) {
    return null;
  }

  const getBreadcrumbName = (path, index, fullPath) => {
    if (path === 'catalog' && index === 0) return 'Каталог';
    if (path === 'red-wines' && fullPath.includes('catalog')) return 'Червоні вина';
    if (path === 'white-wines' && fullPath.includes('catalog')) return 'Білі вина';
    if (path === 'rose-wines' && fullPath.includes('catalog')) return 'Рожеві вина';
    if (path === 'sparkling-wines' && fullPath.includes('catalog')) return 'Ігристі вина';

    switch (path) {
      case 'catalog':
        return 'Каталог';
      case 'cart':
        return 'Кошик';
      case 'checkout':
        return 'Оформлення замовлення';
      case 'personal-account':
        return 'Особистий кабінет';
      case 'order-success':
        return 'Успішне замовлення';
      case 'blog':
        return 'Блог';
      case 'about':
        return 'Про нас';
      case 'promotions':
        return 'Акції';
      default:
        // Якщо це продукт (знаходиться після каталогу), залишаємо його назву як є
        if (fullPath.includes('catalog')) {
          return path.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
        }
        return path.charAt(0).toUpperCase() + path.slice(1);
    }
  };

  return (     
    <nav className="breadcrumbs">       
      <Link to="/" className="breadcrumb-item">         
        Головна       
      </Link>       
      {pathnames.map((name, index) => {         
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;         
        const isLast = index === pathnames.length - 1;         
        const fullPath = location.pathname;          

        return (           
          <React.Fragment key={name}>             
            <span className="breadcrumb-separator">›</span>             
            {isLast ? (               
              <span className="breadcrumb-item active">                 
                {getBreadcrumbName(name, index, fullPath)}               
              </span>             
            ) : (               
              <Link to={routeTo} className="breadcrumb-item">                 
                {getBreadcrumbName(name, index, fullPath)}               
              </Link>             
            )}           
          </React.Fragment>         
        );       
      })}     
    </nav>   
  ); 
};

export default Breadcrumbs; 