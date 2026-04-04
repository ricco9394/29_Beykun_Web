import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  buildCatFactResultCard,
  buildDeleteProductCard,
  buildJokeResultCard,
  buildPostProductCard,
  buildPutProductCard,
  normalizeApiErrorMessage,
} from '../../services/buildApiCards';
import {
  deleteProduct,
  fetchCatFactText,
  fetchRandomJoke,
  postProduct,
  putProduct,
} from '../../services/externalApi';

function getConsoleState(getState) {
  return getState().apiConsole;
}

export const consoleFetchJoke = createAsyncThunk('apiConsole/joke', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchRandomJoke();
    return buildJokeResultCard(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Неизвестная ошибка';
    return rejectWithValue(normalizeApiErrorMessage(msg));
  }
});

export const consoleFetchCatFact = createAsyncThunk('apiConsole/cat', async (_, { rejectWithValue }) => {
  try {
    const fact = await fetchCatFactText();
    return buildCatFactResultCard(fact);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Неизвестная ошибка';
    return rejectWithValue(normalizeApiErrorMessage(msg));
  }
});

export const consolePostOrder = createAsyncThunk('apiConsole/post', async (_, { rejectWithValue }) => {
  try {
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    const data = await postProduct({
      title: `Колбаса 'Даня Супер' (Партия #${String(randomNum)})`,
      price: 999.99,
      description: `Свежая партия, создана только что! Уникальный номер: ${String(randomNum)}`,
      category: 'meat-products',
      image: 'https://via.placeholder.com/150/ff0000/ffffff?text=NEW',
    });
    return { card: buildPostProductCard(data), lastCreatedId: data.id };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Неизвестная ошибка';
    return rejectWithValue(normalizeApiErrorMessage(msg));
  }
});

export const consolePutRecipe = createAsyncThunk('apiConsole/put', async (_, { rejectWithValue }) => {
  try {
    const data = await putProduct(1, {
      id: 1,
      title: "Колбаса 'Императорская' (ГОСТ 2026)",
      price: 1500.0,
      description: 'ОБНОВЛЕННЫЙ РЕЦЕПТ! Теперь содержит настоящую любовь и немного магии.',
      category: 'premium-meat',
      image: 'https://via.placeholder.com/150/gold/000000?text=GOLD',
    });
    return buildPutProductCard(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Неизвестная ошибка';
    return rejectWithValue(normalizeApiErrorMessage(msg));
  }
});

export const consoleDeleteBatch = createAsyncThunk('apiConsole/delete', async (_, { getState, rejectWithValue }) => {
  const id = getConsoleState(getState).lastCreatedProductId;
  if (id == null) {
    return rejectWithValue({
      message: 'Нет товара для удаления! Сначала нажмите «Заказать фуру», чтобы создать партию.',
      clearLastId: false,
    });
  }
  try {
    const data = await deleteProduct(id);
    return { card: buildDeleteProductCard(data, id) };
  } catch (e) {
    const raw = e instanceof Error ? e.message : 'Ошибка удаления';
    const clearLastId = raw.includes('не найден');
    return rejectWithValue({
      message: normalizeApiErrorMessage(raw),
      clearLastId,
    });
  }
});

const initialState = {
  status: 'idle',
  loadingMessage: '',
  errorMessage: '',
  card: null,
  lastCreatedProductId: null,
};

function applyPending(state, message) {
  state.status = 'loading';
  state.loadingMessage = message;
  state.errorMessage = '';
}

const apiConsoleSlice = createSlice({
  name: 'apiConsole',
  initialState,
  reducers: {
    clearConsole(state) {
      state.status = 'idle';
      state.card = null;
      state.errorMessage = '';
      state.loadingMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(consoleFetchJoke.pending, (state) => {
        applyPending(state, 'Ищем ржачку среди поваров');
      })
      .addCase(consoleFetchJoke.fulfilled, (state, action) => {
        state.status = 'success';
        state.card = action.payload;
        state.loadingMessage = '';
      })
      .addCase(consoleFetchJoke.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload ?? 'Ошибка';
        state.loadingMessage = '';
      })
      .addCase(consoleFetchCatFact.pending, (state) => {
        applyPending(state, 'Спрашиваем у котов про колбасу');
      })
      .addCase(consoleFetchCatFact.fulfilled, (state, action) => {
        state.status = 'success';
        state.card = action.payload;
        state.loadingMessage = '';
      })
      .addCase(consoleFetchCatFact.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload ?? 'Ошибка';
        state.loadingMessage = '';
      })
      .addCase(consolePostOrder.pending, (state) => {
        applyPending(state, 'Отправляем заказ на завод (FakeStore)');
      })
      .addCase(consolePostOrder.fulfilled, (state, action) => {
        state.status = 'success';
        state.card = action.payload.card;
        state.lastCreatedProductId = action.payload.lastCreatedId;
        state.loadingMessage = '';
      })
      .addCase(consolePostOrder.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload ?? 'Ошибка';
        state.loadingMessage = '';
      })
      .addCase(consolePutRecipe.pending, (state) => {
        applyPending(state, 'Обновляем рецепт товара №1');
      })
      .addCase(consolePutRecipe.fulfilled, (state, action) => {
        state.status = 'success';
        state.card = action.payload;
        state.loadingMessage = '';
      })
      .addCase(consolePutRecipe.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload ?? 'Ошибка';
        state.loadingMessage = '';
      })
      .addCase(consoleDeleteBatch.pending, (state) => {
        const id = state.lastCreatedProductId;
        applyPending(state, id != null ? `Уничтожаем ВАШУ партию ID: ${String(id)}...` : 'Удаление…');
      })
      .addCase(consoleDeleteBatch.fulfilled, (state, action) => {
        state.status = 'success';
        state.card = action.payload.card;
        state.lastCreatedProductId = null;
        state.loadingMessage = '';
      })
      .addCase(consoleDeleteBatch.rejected, (state, action) => {
        state.status = 'error';
        const payload = action.payload;
        state.errorMessage = payload?.message ?? 'Ошибка';
        if (payload?.clearLastId) state.lastCreatedProductId = null;
        state.loadingMessage = '';
      });
  },
});

export const { clearConsole } = apiConsoleSlice.actions;
export const apiConsoleReducer = apiConsoleSlice.reducer;
