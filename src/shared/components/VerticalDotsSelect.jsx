/** @jsxImportSource @emotion/react */
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import DotsVertical from "../../assets/icons/black/dots_vertical.svg?react";

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectTrigger = styled.button`
  padding: 8px 16px;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const SelectContent = styled.ul`
  position: absolute;
  top: 0;
  left: -8px;
  z-index: 10;
  width: 70px;
  background-color: ${({ theme }) => theme.colors.neutrals_08};
  border: 1px solid ${({ theme }) => theme.colors.neutrals_05};
  border-radius: 4px;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.3);
  list-style: none;
  padding: 8px 6px;
  margin: 0;
`;

const SelectItem = styled.li`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 6px 8px;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.neutrals_00};
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutrals_05};
  }
`;

const VerticalDotsSelect = ({ handleEdit, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleChange = (action) => {
    setIsOpen(false);
    if (action === "edit") {
      handleEdit();
    } else if (action === "delete") {
      handleDelete();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SelectContainer ref={dropdownRef}>
      <SelectTrigger onClick={toggleDropdown}>
        <DotsVertical />
      </SelectTrigger>

      {isOpen && (
        <SelectContent>
          <SelectItem onClick={() => handleChange("edit")}>수정</SelectItem>
          <SelectItem onClick={() => handleChange("delete")}>삭제</SelectItem>
        </SelectContent>
      )}
    </SelectContainer>
  );
};

export default VerticalDotsSelect;
