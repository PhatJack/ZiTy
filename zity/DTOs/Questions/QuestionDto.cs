﻿using zity.DTOs.Answers;
using zity.DTOs.OtherAnswers;
using zity.DTOs.Surveys;

namespace zity.DTOs.Questions
{
    public class QuestionDTO
    {
        public int Id { get; set; }

        public string Content { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        public int? SurveyId { get; set; }

        public ICollection<AnswerDTO> Answers { get; set; } = [];

        public ICollection<OtherAnswerDTO> OtherAnswers { get; set; } = [];

        public SurveyDTO? Survey { get; set; }
    }
}
