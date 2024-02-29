import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

import { CreateQuestionUseCase } from './create-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create a Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: 'author-1',
      title: 'New question',
      content: 'Question content',
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual('New question');
    expect(question.content).toEqual('Question content');
    expect(inMemoryQuestionsRepository.items[0]).toEqual(question);
  });
});
