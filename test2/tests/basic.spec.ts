import { test, expect } from '@playwright/test';

test('loading page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('線上測驗');
  await expect(page.getByTestId('quiz-title')).toBeVisible();
  await expect(page.getByTestId('quiz-title')).toContainText('線上測驗');
  await expect(page.getByTestId('question-count')).toBeVisible();
  await expect(page.getByTestId('question-count')).toContainText('第 1 題 / 共 3 題');
  await expect(page.getByTestId('option-a')).toBeVisible();
  await expect(page.getByTestId('option-b')).toBeVisible();
  await expect(page.getByTestId('option-c')).toBeVisible();
  await expect(page.getByTestId('option-d')).toBeVisible();
  await expect(page.getByTestId('option-a')).toContainText('(a): 答案a1');
  await expect(page.getByTestId('option-b')).toContainText('(b): 答案b1');
  await expect(page.getByTestId('option-c')).toContainText('(c): 答案c1');
  await expect(page.getByTestId('option-d')).toContainText('(d): 答案d1');
  await expect(page.getByTestId('next-button')).toBeVisible();
  await expect(page.getByTestId('next-button')).toContainText('下一個問題');
  await page.getByTestId('option-a').click();
  await page.getByTestId('next-button').click();
  await expect(page.getByTestId('question-count')).toBeVisible();
  await expect(page.getByTestId('prev-button')).toBeVisible();
  await expect(page.getByTestId('next-button')).toBeVisible();
  await page.getByTestId('option-c').click();
  await page.getByTestId('next-button').click();
  await expect(page.getByTestId('question-count')).toBeVisible();
  await expect(page.getByTestId('prev-button')).toBeVisible();
  await expect(page.getByTestId('submit-button')).toBeVisible();
  await page.getByTestId('option-a').click();
  await page.getByTestId('submit-button').click();
  await expect(page.getByTestId('quiz-result')).toBeVisible();
});

test('start a exam', async ({ page }) => {
  await page.goto('/');
  const options = ['option-a', 'option-b', 'option-c', 'option-d'];

  // choose the option
  var option;
  option = options[Math.floor(Math.random()*4)];
  console.log(option);
  await page.getByTestId(option).click();
  await page.getByTestId('next-button').click();

  option = options[Math.floor(Math.random()*4)];
  console.log(option);
  await page.getByTestId(option).click();
  await page.getByTestId('next-button').click();

  option = options[Math.floor(Math.random()*4)];
  console.log(option);
  await page.getByTestId(option).click();
  await page.getByTestId('submit-button').click();


  // count correct answer
  const RED = 'rgb(255, 0, 0)', GREEN = 'rgb(0, 128, 0)';
  var correctCount = 0;
  var redCount = 0, greenCount = 0;

  async function countColor(option: string) {
    var color = await page.getByTestId(option).evaluate((ele) => {
      return window.getComputedStyle(ele).getPropertyValue('color')});
    console.log(color);

    if(color == RED)
      redCount++;
    if(color == GREEN)
      greenCount++;
  };

  await countColor('option-a');
  await countColor('option-b');
  await countColor('option-c');
  await countColor('option-d');
  await page.getByTestId('prev-button').click();
  await countColor('option-a');
  await countColor('option-b');
  await countColor('option-c');
  await countColor('option-d');
  await page.getByTestId('prev-button').click();
  await countColor('option-a');
  await countColor('option-b');
  await countColor('option-c');
  await countColor('option-d');


  // check number of correct answer
  console.log('Red: ' + redCount);
  console.log('Green: ' + greenCount);
  await expect(redCount%4).toBe(0);
  await expect(greenCount%4).toBe(0);
  await expect(redCount+greenCount).toBe(12);
  correctCount = greenCount / 4;
  console.log('Correct: ' + correctCount);
  await expect(page.getByTestId('quiz-result')).toContainText(`答對題數：${correctCount} / 總題數：${3}`);
});
