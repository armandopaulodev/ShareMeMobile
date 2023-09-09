import * as React from 'react';
import { DataTable, Text, Button } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { View } from 'react-native';

const DataTableComponent = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const { toggleThemeType, themeType, isDarkTheme, theme } = useTheme();

  const [items] = React.useState([
    {
      key: 1,
      name: '...',
      calories: '12/08/2023 12:34',
      fat: 16,
    },
    {
      key: 2,
      name: '...',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: '....',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: '.....',
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={{ marginBottom:3 }}>
      <View style={{ flexDirection:'row', justifyContent:'space-between', marginBottom: 4 }}>
      <Text style={{ fontWeight: 'bold', color: theme.colors.secondary }}>
        Seus uploads recentes
      </Text>
      <Button icon="book-play-outline" mode="outlined" onPress={() => console.log('Pressed')}>
        Minhas Turmas
      </Button>
      </View>
      <DataTable style={{
        
        borderWidth: 0.2, shadowColor: theme.colors.secondary,
        borderColor: theme.colors.secondary, padding: 20, borderRadius: 5
      }}>
        <DataTable.Header>
          <DataTable.Title>Ficheiros</DataTable.Title>
          <DataTable.Title numeric>Data.Upload</DataTable.Title>
          <DataTable.Title numeric>Baixar</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
            <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} de ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Por pagina'}
        />
      </DataTable>
    </View>


  );
};

export default DataTableComponent;