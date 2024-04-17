import { createGlobalStyle } from 'styled-components';

export const WebsiteScrollBar = createGlobalStyle`
    /* Убираем стандартный вид ползунка веб-страницы */
    ::-webkit-scrollbar {
        width: 6px;
        /* Ширина ползунка */
    }

    /* Стилизация ползунка */
    ::-webkit-scrollbar-thumb {
        background-color: #9C9C9C;
        /* Цвет ползунка */
        border-radius: 50px;
        /* Закругление углов ползунка */
    }

    /* Стилизация трека, по которому двигается ползунок */
    ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0);
        /* Цвет трека */
    }

    /* Возможно, потребуется добавить стили и для других браузеров, таких как Firefox */
    /*::-moz-scrollbar {
      // стили для Firefox
    }*/
  `;
