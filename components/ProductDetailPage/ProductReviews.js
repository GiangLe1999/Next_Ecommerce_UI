import React, { useEffect, useState } from "react";
import styled from "styled-components";

import TitleStyle from "../UI/Title";
import Input from "../UI/Input";
import StarsRating from "../UI/StarsRating";
import TextArea from "../UI/TextArea";
import Button from "../UI/Button";
import { CheckIconWhite } from "../Layout/ButtonIcon";
import { smallShadow } from "@/lib/boxShadow";
import axios from "axios";
import Spinner from "../UI/Spinner";
import { RevealWrapper } from "next-reveal";
import Image from "next/image";
import { primary } from "@/lib/colors";
import { hoverColor } from "@/lib/colors";

const ProductReviews = ({ product }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showRatingsText, setShowRatingsText] = useState(false);

  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const submitReviewHandler = () => {
    const data = {
      title,
      description,
      stars,
      product: product._id,
    };
    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDescription("");
      setStars(0);
    });
  };

  useEffect(() => {
    setIsLoadingReviews(true);
    axios.get(`/api/reviews?product=${product._id}`).then((res) => {
      setReviews(res.data);
      setIsLoadingReviews(false);
    });
  }, []);

  return (
    <>
      <Title>Reviews</Title>
      <ColsWrapper>
        <WhiteBox>
          <RevealWrapper>
            <SubTitle>Add your review</SubTitle>
            <Ratings>
              <StyledLabel>Ratings:</StyledLabel>
              <StarsRating
                onChange={setStars}
                showRatingsText={setShowRatingsText}
              />
              {showRatingsText && (
                <RatingsText>
                  You rated this product {stars} {stars > 1 ? "stars" : "star"}!
                </RatingsText>
              )}
            </Ratings>
            <div>
              <StyledLabel htmlFor="title">Title</StyledLabel>
              <Input
                value={title}
                placeholder="Give your review a title"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <ReviewBody>
              <StyledLabel>
                Body of Review (Maximum 1500 characters)
              </StyledLabel>
              <TextArea
                value={description}
                placeholder="Was it good? Write your thought about the product here."
                rows={8}
                onChange={(e) => setDescription(e.target.value)}
              />
            </ReviewBody>
            <div>
              <Button primary="yes" onClick={submitReviewHandler}>
                <CheckIconWhite /> Submit your review
              </Button>
            </div>
          </RevealWrapper>
        </WhiteBox>
        <WhiteBox>
          <RevealWrapper>
            {isLoadingReviews && <Spinner fullwidth="yes" />}
            {!isLoadingReviews && reviews.length > 0 && (
              <ReviewsWrapper>
                <SubTitle>All reviews</SubTitle>
                {reviews.map((r) => (
                  <ReviewWrapper key={r._id}>
                    <ReviewHeader>
                      <StarsRating
                        size="sm"
                        disabled="yes"
                        defaultHowMany={r.stars}
                      />
                      <time>
                        {new Date(r.createdAt).toLocaleString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </ReviewHeader>
                    <ReviewTitle>{r.title}</ReviewTitle>
                    <ReviewDescription>{r.description}</ReviewDescription>
                  </ReviewWrapper>
                ))}
              </ReviewsWrapper>
            )}
            {!isLoadingReviews && reviews.length === 0 && (
              <EmptyReviewsWrapper>
                <EmptyReviewsImage
                  src={"/assets/no-review-2.png"}
                  alt="empty reviews"
                  width={700}
                  height={541}
                />
                <EmptyText>
                  <EmptyTitle>No reviews yet!</EmptyTitle>
                  <EmptyParagraph>
                    Let&apos;s be the first to add a review of this product.
                  </EmptyParagraph>
                </EmptyText>
              </EmptyReviewsWrapper>
            )}
          </RevealWrapper>
        </WhiteBox>
      </ColsWrapper>
    </>
  );
};

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: ${smallShadow};
`;

const Title = styled.h2`
  ${TitleStyle}
`;

const SubTitle = styled.h3`
  margin-top: 5px;
  font-size: 1rem;
  font-weight: 700;
  font-size: 1.3rem;
`;

const StyledLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
`;

const Ratings = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 5px;
`;

const RatingsText = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-style: italic;
  position: relative;
  top: -0.5px;
`;

const ReviewBody = styled.div`
  margin: 6px 0 10px;
`;

const ReviewsWrapper = styled.div``;

const ReviewWrapper = styled.div`
  border-top: 1px solid #ddd;
  padding: 20px 10px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  time {
    font-size: 14px;
    font-weight: 600;
    color: #939393;
  }
`;

const ReviewTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 10px 0 10px;
`;

const ReviewDescription = styled.p`
  margin: 0;
  font-size: 0.8rem;
  line-height: 22px;
`;

const EmptyReviewsWrapper = styled.div`
  width: 100%;
  text-align: center;
  > div {
    position: unset !important;
  }
`;

const EmptyReviewsImage = styled(Image)`
  object-fit: contain;
  width: 76% !important;
  height: unset !important;
`;

const EmptyText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyTitle = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin: 20px 0 10px;
`;

const EmptyParagraph = styled.p`
  margin: 0 0 5px;
  font-size: 0.8rem;

  a {
    font-weight: bold;
    color: ${primary};
    text-decoration: underline;

    &:hover {
      color: ${hoverColor};
    }
  }
`;

export default ProductReviews;
