# Круговой лоадер 🔄
![Демо работы лоадера](image.png)  


## 🌟 Возможности
- **Настраиваемая анимация** - Плавное вращение через CSS  
- **Интерактивное управление** - Включение/выключение анимации и видимости  
- **Отображение прогресса** - Визуализация загрузки от 0 до 100%  
- **Доступность** - Поддержка ARIA-атрибутов  


## 📦 Подключение
```html
<script type="module" src="scriptOfLoader.js"></script>
```


## 🛠 Быстрый старт
```javascript
import { addLoader } from './scriptOfLoader.js';

// Добавление лоадера на страницу
// Возвращает уникальный id лоадера
const loaderId = addLoader(elem, where); 
// where - это специальное слово, указывающее, куда по отношению к elem
//      производить вставку. Значение должно быть одним из следующих:
 "beforebegin" – вставить лоадер непосредственно перед elem,
 "afterbegin" – в начало elem,
 "beforeend" – в конец elem,
 "afterend" – непосредственно после elem.

```


## 🎛 Управление
```javascript
import { setProgress, removeLoader,
         animateLoader, stopAnimateLoader } from './scriptOfLoader.js';

setProgress(loaderId, procent);      // Установить прогресс 
// procent - число или строка, состоящая из цифр
animateLoader(loaderId);        // Запустить анимацию
stopAnimateLoader(loaderId);    // Остановить анимацию
removeLoader(loaderId);         // Удалить контейнер с лоадером
```
