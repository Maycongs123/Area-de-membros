import React, { useState } from "react";
import { HomeModalProps, CourseModule } from "../../../types";

import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { SearchIcon } from "../../Icons/SearchIcon";
import { useCourse } from "../../../contexts/CarouselContext";

interface SearchModalProps {
  toggleModal: (modalName: keyof HomeModalProps) => void;
}

const SearchModal: React.FC<SearchModalProps> = () => {
  const { courses: carousels } = useCourse();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    CourseModule[]
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (query == "") {
      setFilteredSuggestions([]);
      setSearchQuery(query);
      return;
    }

    setSearchQuery(query);

    const filtered = getSuggestions(query);
    setFilteredSuggestions(filtered);
  };

  const navigate = useNavigate();

  const handleWatchLesson = (title: string, id: string) => {
    navigate(`/curso/${title}/lesson/${id}`);
  };

  const getSuggestions = (query: string) => {
    const listaDeCursos: CourseModule[] = carousels[0].courseModule!.filter(
      (suggestion) =>
        suggestion.title.toLowerCase().includes(query.toLowerCase())
    );

    return listaDeCursos;
  };

  return (
    <>
      <S.Container>
        <S.IconContainer>
          <SearchIcon />
        </S.IconContainer>
        <input
          className="input"
          placeholder="Pesquisar"
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
        />

        <ul>
          {filteredSuggestions.map((suggestion) => (
            <li
              className="list-item"
              key={suggestion.id}
              onClick={() =>
                handleWatchLesson(suggestion.title, suggestion.id!)
              }
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
        
      </S.Container>
    </>
  );
};

export default SearchModal;
