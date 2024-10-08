import React from 'react'
import styles from './product.module.css'
import { MdAddShoppingCart } from 'react-icons/md'
import { useCartContext } from '../../context/CartContext'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const Product = ({ product }) => {

    const { 
        addItemToCart, 
        isProductInCart, 
        getCartItem, 
        incrementQuantity, 
        decrementQuantity  
    } = useCartContext();

  return (
    <div className={styles.productItemContainer}>
      <div className={styles.imageContainer}>
        <picture>
            <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
            <source media="(min-width: 768px)" srcSet={product.image.tablet} />
            <source media="(max-width: 767px)" srcSet={product.image.moible} />
            <img 
                src={product.image.thumbnail} 
                alt={product.name} 
                className={styles.productImage} 
                loading='lazy'
            />
        </picture>
      </div>

      <div className={styles.productDetails}>
        {
            !isProductInCart(product.name) ? (
                <div className={styles.addCartButton} onClick={() => addItemToCart(product)}>
                    <MdAddShoppingCart size={20} />
                    <span>Add to Cart</span>
                </div>
            ) : (
                <div className={styles.cartItemButtonContainer}>
                    <div className={styles.circle} onClick={() => decrementQuantity(product.name)}>
                        <AiOutlineMinus size={12} className={styles.icon}/> 
                    </div>
                    <p className={styles.quantity}>
                        {getCartItem(product.name).quantity}
                    </p>
                    <div className={styles.circle} onClick={() => incrementQuantity(product.name)}>
                        <AiOutlinePlus size={12} className={styles.icon}/> 
                    </div>
                </div>
            )
        }

        <p className={styles.productCategory}>{product.category}</p>
        <p className={styles.productName}>{product.name}</p>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default Product
