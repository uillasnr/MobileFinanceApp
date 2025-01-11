import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  TextInput
} from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { DayState } from 'react-native-calendars/src/types';
import { Feather } from '@expo/vector-icons';
import { ptBR } from '../../src/utils/localeCalendarConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export function DateInputCalendar() {
  const [day, setDay] = useState<DateData>();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handleDaySelect = (selectedDay: DateData) => {
    setDay(selectedDay);
    setIsCalendarVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsCalendarVisible(true)}
      >
        <TextInput
          style={styles.inputText}
          placeholder="Selecione uma data"
          placeholderTextColor="#717171"
          value={day?.dateString}
          editable={false}
        />
        <Feather name="calendar" size={24} color="#E8E8E8" />
      </TouchableOpacity>

      <Modal
        visible={isCalendarVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setIsCalendarVisible(false)}
        >
          <View style={styles.modalContent}>
            <Calendar
              style={styles.calendar}
              renderArrow={(direction: 'right' | 'left') => (
                <Feather
                  size={24}
                  color="#E8E8E8"
                  name={`chevron-${direction}`}
                />
              )}
              headerStyle={{
                borderBottomWidth: 0.5,
                borderBottomColor: '#E8E8E8',
                paddingBottom: 10,
                marginBottom: 10,
              }}
              theme={{
                textMonthFontSize: 18,
                monthTextColor: '#E8E8E8',
                todayTextColor: '#F06543',
                selectedDayBackgroundColor: '#F06543',
                selectedDayTextColor: '#E8E8E8',
                arrowColor: '#E8E8E8',
                calendarBackground: '#181818',
                textDayStyle: { color: '#E8E8E8' },
                textDisabledColor: '#717171',
                arrowStyle: {
                  margin: 0,
                  padding: 0,
                },
              }}
              minDate={new Date().toDateString()}
              hideExtraDays
              onDayPress={handleDaySelect}
              markedDates={
                day && {
                  [day.dateString]: { selected: true },
                }
              }
              dayComponent={({
                date,
                state,
              }: {
                date: DateData;
                state: DayState;
              }) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.day,
                      date.dateString === day?.dateString && styles.daySelected,
                    ]}
                    onPress={() => handleDaySelect(date)}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        (state === 'inactive' || state === 'disabled') &&
                          styles.disabled,
                        state === 'today' && styles.today,
                        date.dateString === day?.dateString && styles.dayText,
                      ]}
                    >
                      {date.day}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 24,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  inputText: {
    color: '#E8E8E8',
    fontSize: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#181818',
    borderRadius: 16,
    padding: 16,
  },
  calendar: {
    backgroundColor: 'transparent',
  },
  dayText: {
    color: '#E8E8E8',
  },
  day: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  disabled: {
    color: '#717171',
  },
  today: {
    color: '#F06543',
    fontWeight: 'bold',
  },
  daySelected: {
    backgroundColor: '#F06543',
  },
});