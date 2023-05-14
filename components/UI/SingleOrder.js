import { subColor } from "@/lib/colors";
import React from "react";
import styled from "styled-components";

const SingleOrder = ({ order }) => {
  const totalPrice = order.line_items.reduce((acc, cur) => {
    const curPrice = (cur.price_data.unit_amount / 100) * cur.quantity;
    return acc + curPrice;
  }, 0);

  return (
    <StyledOrder>
      <time>
        {new Date(order.createdAt).toLocaleDateString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
      <StyledTable>
        <TableHead>
          <th>Products</th>
          <th>Quantity</th>
          <th>Item Price</th>
          <th>Total</th>
        </TableHead>
        <tbody>
          {order.line_items.map((item) => (
            <ProductRow key={item._id}>
              <td>{item.price_data.product_data.name}</td>
              <td>
                {item.quantity} {item.quantity > 1 ? "items" : "item"}
              </td>
              <td>${item.price_data.unit_amount / 100}</td>
              <td>${(item.price_data.unit_amount * item.quantity) / 100}</td>
            </ProductRow>
          ))}
          <TotalPriceRow>
            <TotalPrice>All Products :</TotalPrice>
            <td></td>
            <td></td>
            <TotalPrice>${totalPrice}</TotalPrice>
          </TotalPriceRow>
        </tbody>
      </StyledTable>
    </StyledOrder>
  );
};

const StyledOrder = styled.div`
  time {
    font-size: 0.75rem;
    margin-left: 3px;
    font-style: italic;
    color: ${subColor};
  }
  margin-bottom: 40px;
`;

const StyledTable = styled.table`
  width: 100%;
  font-size: 1rem;
  text-align: left;
`;

const ProductRow = styled.tr`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  font-size: 1rem;
  padding: 5px 0;

  &:last-child {
    border-bottom: 1px solid #ddd;
  }
`;

const TotalPriceRow = styled.tr`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  font-size: 1rem;
  padding: 5px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const TableHead = styled.thead`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  border-bottom: 1px solid #ddd;
  padding: 5px 0;

  th {
    font-weight: 600;
    font-size: 1rem;
  }
`;

const TotalPrice = styled.td`
  font-weight: 600;
  padding: 10px 0;
`;

export default SingleOrder;
