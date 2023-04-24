import { act, renderHook } from '@testing-library/react-hooks';
import { useEffect } from 'react';

describe('useEffect fetch', () => {
  it('should call fetch and set state with data', async () => {
    const mockData = { name: 'Test Data' };
    const mockFetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(mockData),
    });

    // テスト内で使用するurlを設定し、useEffectをレンダリングします。
    const url = "/api";
    let setState = jest.fn();
    await act(async () => {
      renderHook(() => (
        useEffect(() => {
          fetch(url).then(res => {
            if (res.status === 200) {
              return res.json();
            }
          }).then(data => {
            setState(data);
          }).catch(err => console.log(err)); // エラー処理の追加
        }, [])
      ));
    });

    expect(mockFetch).toHaveBeenCalledWith(url);

    // setStateがデータで呼ばれたことを確認します。
    expect(setState).toHaveBeenCalledWith(mockData);
  });
});
