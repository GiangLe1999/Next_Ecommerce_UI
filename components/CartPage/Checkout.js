import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

import Table from "@/components/UI/Table";
import { CartContext } from "@/store/cart-context";
import NumberInput from "@/components/CartPage/CartNumberInput";
import { Box } from "@/pages/cart";
import { smallShadow } from "@/lib/boxShadow";
import { hoverColor, primary } from "@/lib/colors";
import { RemoveIcon } from "../Layout/ButtonIcon";
import { RevealWrapper } from "next-reveal";

const extractProdQuantity = (cartProducts, prodId) => {
  return cartProducts.filter((productId) => productId === prodId).length;
};

const Checkout = () => {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [shippingFee, setShippingFee] = useState("");

  // Thay đổi định dạng State lưu thông tin giỏ hàng
  const changedFormProducts = products.map((p) => {
    return { id: p._id, quantity: extractProdQuantity(cartProducts, p._id) };
  });

  // Fetch data của các Products nằm trong Cart
  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    }
  }, [cartProducts]);

  // Gỡ sản phẩm khỏi giỏ hàng
  const removeItemsFromCart = (prodId) => {
    const copiedCartProducts = [...cartProducts];
    const updatedCartProducts = copiedCartProducts.filter(
      (id) => id !== prodId
    );
    setCartProducts(updatedCartProducts);
  };

  // Get shipping fee
  useEffect(() => {
    axios
      .get("/api/settings?name=shippingFee")
      .then((res) => setShippingFee(res.data.value));
  }, []);

  // Tính subTotal (chưa có shipping fee)
  let subTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => productId === p._id)?.price;
    subTotal += price;
  }

  return (
    <Box>
      {cartProducts?.length === 0 && (
        <RevealWrapper>
          <EmptyCart>
            <EmptyCartImageWrapper>
              <EmptyCartImage
                src="/assets/empty-cart.webp"
                alt="empty cart"
                width={535}
                height={357}
                priority={true}
              />
            </EmptyCartImageWrapper>
            <EmptyTitle>Your cart is currently empty</EmptyTitle>
            <EmptyParagraph>
              Before proceed to checkout, you must add some products to your
              cart.
            </EmptyParagraph>
            <EmptyParagraph>
              You will find a lot of interesting products on our{" "}
              <Link href="/products">All Products</Link> page.
            </EmptyParagraph>
          </EmptyCart>
        </RevealWrapper>
      )}
      {cartProducts?.length !== 0 && (
        <RevealWrapper>
          <CartTitle>Cart</CartTitle>
          <Table col={3}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts?.length > 0 &&
                products.map((product, index) => (
                  <tr key={product._id}>
                    <td>
                      <ProductInfo>
                        <ProductImageBox>
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={80}
                            height={80}
                          />
                        </ProductImageBox>
                        <p>
                          <b>Name:</b>&nbsp;
                          {product.title}
                        </p>
                        <p>
                          <b>Brand:</b>&nbsp;
                          {product.properties.Brand}
                        </p>
                      </ProductInfo>
                    </td>
                    <td>
                      <NumberInput
                        defaultValue={extractProdQuantity(
                          cartProducts,
                          product._id
                        )}
                        cartProducts={cartProducts}
                        prodId={product._id}
                        changedFormProducts={changedFormProducts}
                      />
                      <Remove onClick={() => removeItemsFromCart(product._id)}>
                        <RemoveIcon />
                      </Remove>
                    </td>
                    <Price>
                      $
                      {extractProdQuantity(cartProducts, product._id) *
                        product.price}
                    </Price>
                  </tr>
                ))}

              <CalculateRow>
                <td>Subtotal:</td>
                <td></td>
                <Price>${subTotal}</Price>
              </CalculateRow>
              <CalculateRow>
                <td>Shipping:</td>
                <td></td>
                <Price>${shippingFee}</Price>
              </CalculateRow>
              <Total>
                <td>Total:</td>
                <td></td>
                <td>${subTotal + parseInt(shippingFee || 0)}</td>
              </Total>
            </tbody>
          </Table>
        </RevealWrapper>
      )}
    </Box>
  );
};

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: 0.9rem;
    margin: 5px 0;
  }
`;

const CartTitle = styled.h1`
  margin-top: 0;
  font-size: 1.5rem;
`;

const ProductImageBox = styled.div`
  padding: 10px;
  width: 100px;
  height: 100px;
  aspect-ratio: 1;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: ${smallShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  margin-bottom: 15px;
`;

const Price = styled.td`
  font-size: 1.1rem;
  font-weight: 500;
`;

const Remove = styled.button`
  border: none;
  background-color: ${primary};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #555555;
  }

  svg {
    width: 22px;
    height: 22px;
    color: white;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Total = styled.tr`
  text-align: left;
  text-transform: uppercase;
  color: ${primary};
  font-weight: bold;
  font-size: 1.4rem;
  border-top: 1px solid ${primary} !important;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 20px;
`;

const EmptyCartImageWrapper = styled.div`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  > div {
    position: unset !important;
  }
`;

const EmptyCartImage = styled(Image)`
  object-fit: contain;
  width: 100% !important;
  height: unset !important;
`;

const EmptyTitle = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin: 10px 0 15px;
`;

const EmptyParagraph = styled.p`
  margin: 0 0 5px;
  font-size: 0.8rem;

  a {
    font-weight: bold;
    font-size: 0.9rem;
    color: ${primary};
    text-decoration: underline;

    &:hover {
      color: ${hoverColor};
    }
  }
`;

const CalculateRow = styled.tr`
  border: none;
`;

export default Checkout;
