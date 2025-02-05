import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { ptBR } from '../../src/utils/localeCalendarConfig';
import { format, parse } from 'date-fns';
import { ptBR as dateFnsPtBR } from 'date-fns/locale';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface DateCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export default function DateCalendar({ selectedDate, onDateSelect }: DateCalendarProps) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [displayedDate, setDisplayedDate] = useState("Selecione uma data");

  // Effect to handle initial selectedDate and updates
  useEffect(() => {
    if (selectedDate) {
      try {
        // Parse the input date string (assuming it's in YYYY-MM-DD format)
        const date = parse(selectedDate, 'yyyy-MM-dd', new Date());
        // Format it to Brazilian date format
        const formattedDate = format(date, 'dd/MM/yyyy', { locale: dateFnsPtBR });
        setDisplayedDate(formattedDate);
      } catch (error) {
        setDisplayedDate("Selecione uma data");
      }
    }
  }, [selectedDate]);

  const handleDaySelect = (selectedDay: DateData) => {
    try {
      // Parse the selected date
      const date = parse(selectedDay.dateString, 'yyyy-MM-dd', new Date());
      // Format for display (Brazilian format)
      const formattedDate = format(date, 'dd/MM/yyyy', { locale: dateFnsPtBR });
      
      setDisplayedDate(formattedDate);
      onDateSelect(selectedDay.dateString); // Keep the YYYY-MM-DD format for the parent component
      setIsCalendarVisible(false);
    } catch (error) {
      console.error('Error formatting date:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
        <Text style={styles.input}>{displayedDate}</Text>
      </TouchableOpacity>

      <Modal
        visible={isCalendarVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        {/* Rest of your Modal code remains the same */}
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsCalendarVisible(false)}
        >
          <View style={styles.modalContent}>
            <Calendar
              style={styles.calendar}
              renderArrow={(direction: 'right' | 'left') => (
                <Feather size={24} color="#E8E8E8" name={`chevron-${direction}`} />
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
                todayTextColor: '#9333EA',
                selectedDayBackgroundColor: '#9333EA',
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
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#9333EA' }
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
  },
  input: {
    paddingVertical: 15,
    paddingLeft: 22,
    color: '#E2E8F0',
    fontSize: 16,
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
});
