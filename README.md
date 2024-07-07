# Тестирование [testing-homework](https://github.com/dima117/testing-homework)
Репозиторий содержит файлы, необходимые для проведения тестирования приложения.
1. Скопируй репозиторий [testing-homework](https://github.com/dima117/testing-homework) с помощью `git clone https://github.com/dima117/testing-homework`
2. Проинициализируй зависимости с помощью `npm i` или любого другого пакетного менеджера. **(+нужно будет разобраться с зависимостями testplane)**
3. Внутри проекта создай папку `/test`
4. Скопируй в папку `/test` этот репозиторй с помощью `git clone https://github.com/st119149/yandex-homework-testing`
5. Запусти тесты с помощью `npm run test` и `npx testplane`
6. При запуске интеграционных тестов передай значение в параметре запроса, например, `http://localhost:3000/hw/store/catalog/0?bug_id=9`
7. При запуске модульных тестов передай значение в переменной окружения `BUG_ID`, например, `BUG_ID=1 npm run test` для linux или `($env:BUG_ID = "1") -and (npm run test)` для windows
