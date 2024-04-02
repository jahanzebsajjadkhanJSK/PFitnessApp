import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const WorkoutHistoryScreen = ({ navigation }) => {
  return (
    <View style={{}}>
      <Calendar
        style={{ width: '100%' }}
      />
    </View>
  )
}

export default WorkoutHistoryScreen
