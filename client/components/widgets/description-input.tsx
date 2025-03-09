import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InputField } from '../input-field'

export function DescriptionInput() {
  const { control, setFocus } = useFormContext()

  return (
    <Controller
      name="description"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return '내용을 입력해주세요.'
          }

          if (data.length < 5) {
            return '내용은 최소 5자 이상이어야 합니다.'
          }
        },
      }}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          autoFocus
          variant="fill"
          label="내용"
          placeholder="내용을 입력해주세요."
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => setFocus('description')}
          value={value}
          onChangeText={onChange}
          error={error?.message}
          // 크기 조정 필요.
          multiline
        />
      )}
    />
  )
}
