import { test, expect } from '@playwright/test';
//test for web page is loaded
test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/井字遊戲/);
});
//test for basic page elements are visible
test('basic element test', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page.getByTestId('symbol-choice-content')).toBeVisible();
  await expect(page.getByTestId('modal-title')).toBeVisible();
  await expect(page.getByTestId('choose-X')).toBeVisible();
  await expect(page.getByTestId('choose-O')).toBeVisible();
  await expect(page.getByTestId('choose-X')).toContainText('X');
  await expect(page.getByTestId('choose-O')).toContainText('O');
  await expect(page.getByTestId('close-modal')).toBeVisible();
  await page.getByTestId('choose-X').click();
  await expect(page.getByRole('heading', { name: '井字遊戲' })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText('井字遊戲');
  await expect(page.getByTestId('game-board')).toBeVisible();
  await expect(page.getByTestId('cell-0')).toBeVisible();
  await expect(page.getByTestId('cell-1')).toBeVisible();
  await expect(page.getByTestId('cell-2')).toBeVisible();
  await expect(page.getByTestId('cell-3')).toBeVisible();
  await expect(page.getByTestId('cell-4')).toBeVisible();
  await expect(page.getByTestId('cell-5')).toBeVisible();
  await expect(page.getByTestId('cell-6')).toBeVisible();
  await expect(page.getByTestId('cell-7')).toBeVisible();
  await expect(page.getByTestId('cell-8')).toBeVisible();
});

//test for game logic when choose X
test('X play', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page.getByTestId('symbol-choice-content')).toBeVisible();
  await page.getByTestId('choose-X').click();
  let cellXCnt = 0;
  //紀錄每一步的結果
  var res = Array(3).fill(new Array(3).fill(null));
  while(await page.locator('.cell:empty').count() > 0){
    await page.waitForTimeout(600);
    res = [
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-1').textContent(), await page.getByTestId('cell-2').textContent()],
      [await page.getByTestId('cell-3').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-5').textContent()],
      [await page.getByTestId('cell-6').textContent(), await page.getByTestId('cell-7').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-3').textContent(), await page.getByTestId('cell-6').textContent()],
      [await page.getByTestId('cell-1').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-7').textContent()],
      [await page.getByTestId('cell-2').textContent(), await page.getByTestId('cell-5').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-2').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-6').textContent()],
    ]
    //判斷遊戲是否結束
    if(await page.getByTestId('result-content').isVisible()){
      if(res.some((row) => row.every((cell) => cell === 'X'))){
        await expect(page.getByTestId('result-message')).toContainText("恭喜!你贏了");
      }else if(res.some((row) => row.every((cell) => cell === 'O'))){
        await expect(page.getByTestId('result-message')).toContainText("你輸了!下次再努力");
      }else{
        await expect(page.getByTestId('result-message')).toContainText("這局平手!");
      }
      await page.getByTestId('confirm-result').click();
      console.log('遊戲結束');
      //print res
      for(var i = 0; i < res.length; i++){
        console.log(res[i]);
      }
      break;
    }
    var OCnt = await page.locator('.cell',{hasText:'X'}).count();
    console.log('目前O數:',OCnt);
    if(OCnt === cellXCnt){
      console.log('玩家是先手');
      await expect(OCnt).toBe(cellXCnt);
    }else{
      console.log('玩家是後手');
      await expect(OCnt).toBe(cellXCnt+1);
    }
    await page.locator('.cell:empty').first().click();   
    res = [
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-1').textContent(), await page.getByTestId('cell-2').textContent()],
      [await page.getByTestId('cell-3').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-5').textContent()],
      [await page.getByTestId('cell-6').textContent(), await page.getByTestId('cell-7').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-3').textContent(), await page.getByTestId('cell-6').textContent()],
      [await page.getByTestId('cell-1').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-7').textContent()],
      [await page.getByTestId('cell-2').textContent(), await page.getByTestId('cell-5').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-2').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-6').textContent()],
    ]
    var XCnt  = await page.locator('.cell',{hasText: 'X'}).count();
    console.log('目前X數:',XCnt);
    await expect(XCnt).toBe(cellXCnt+1);
    cellXCnt++;
  }
});
//test for game logic when choose O
test('O play', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await expect(page.getByTestId('symbol-choice-content')).toBeVisible();
  await page.getByTestId('choose-O').click();
 
  let cellOCnt = 0;
  //紀錄每一步的結果
  var res = Array(3).fill(new Array(3).fill(null));
  while(await page.locator('.cell:empty').count() > 0){
    await page.waitForTimeout(600);
    res = [
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-1').textContent(), await page.getByTestId('cell-2').textContent()],
      [await page.getByTestId('cell-3').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-5').textContent()],
      [await page.getByTestId('cell-6').textContent(), await page.getByTestId('cell-7').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-3').textContent(), await page.getByTestId('cell-6').textContent()],
      [await page.getByTestId('cell-1').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-7').textContent()],
      [await page.getByTestId('cell-2').textContent(), await page.getByTestId('cell-5').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-2').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-6').textContent()],
    ]
    //判斷遊戲是否結束
    if(await page.getByTestId('result-content').isVisible()){
      if(res.some((row) => row.every((cell) => cell === 'O'))){
        await expect(page.getByTestId('result-message')).toContainText("恭喜!你贏了");
      }else if(res.some((row) => row.every((cell) => cell === 'X'))){
        await expect(page.getByTestId('result-message')).toContainText("你輸了!下次再努力");
      }else{
        await expect(page.getByTestId('result-message')).toContainText("這局平手!");
      }
      await page.getByTestId('confirm-result').click();
      console.log('遊戲結束');
      //print res
      for(var i = 0; i < res.length; i++){
        console.log(res[i]);
      }
      break;
    }
    var XCnt = await page.locator('.cell',{hasText:'X'}).count();
    console.log('目前X數:',XCnt);
    if(XCnt === cellOCnt){
      console.log('玩家是先手');
      await expect(XCnt).toBe(cellOCnt);
    }else{
      console.log('玩家是後手');
      await expect(XCnt).toBe(cellOCnt+1);
    }
    await page.locator('.cell:empty').first().click();   
    res = [
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-1').textContent(), await page.getByTestId('cell-2').textContent()],
      [await page.getByTestId('cell-3').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-5').textContent()],
      [await page.getByTestId('cell-6').textContent(), await page.getByTestId('cell-7').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-3').textContent(), await page.getByTestId('cell-6').textContent()],
      [await page.getByTestId('cell-1').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-7').textContent()],
      [await page.getByTestId('cell-2').textContent(), await page.getByTestId('cell-5').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-0').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-8').textContent()],
      [await page.getByTestId('cell-2').textContent(), await page.getByTestId('cell-4').textContent(), await page.getByTestId('cell-6').textContent()],
    ]
    var OCnt  = await page.locator('.cell',{hasText: 'O'}).count();
    console.log('目前O數:',OCnt);
    await expect(OCnt).toBe(cellOCnt+1);
    cellOCnt++;
  }
});