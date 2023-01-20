import React from 'react';
import styled from 'styled-components';

export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  color: #fff;
  background-color: #2b3035;
  border: none;
  border-radius: 5px;

  // Arrow
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3Cpath d='m0.993 2.02 5.25 5.25c0.966 0.966 2.534 0.966 3.5-0l5.264-5.264' fill='none' stroke='%23fff' stroke-width='2px'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px top 50%;
  background-size: 16px auto;

  &:focus {
    outline: 1px solid #2a85ff;
  }
`;
