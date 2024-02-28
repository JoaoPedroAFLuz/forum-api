import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { Question } from '../../enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to get a question by slug', async () => {
    const newQuestion: Question = Question.create({
      authorId: new UniqueEntityId('1'),
      title: 'Nova pergunta',
      slug: Slug.create('nova-pergunta'),
      content: 'Conteúdo da pergunta',
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'nova-pergunta',
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
    expect(question.content).toEqual(newQuestion.content);
  });

  it('should not be able to get a non existing question', async () => {
    await expect(() =>
      sut.execute({
        slug: 'non-existing-question',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
