document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('playerSearch');
    const groupFilter = document.getElementById('groupFilter');
    const rankingBody = document.getElementById('rankingBody');
    const rows = rankingBody.getElementsByTagName('tr');

    // --- 查找功能 ---
    function filterRankings() {
        const searchText = searchInput.value.toLowerCase();
        const selectedGroup = groupFilter.value;

        Array.from(rows).forEach(row => {
            const name = row.cells[1].textContent.toLowerCase();
            const id = row.cells[2].textContent.toLowerCase();
            const rowGroup = row.getAttribute('data-group');

            // 1. 文本搜索逻辑
            const matchesSearch = name.includes(searchText) || id.includes(searchText);

            // 2. 组别筛选逻辑
            const matchesGroup = (selectedGroup === 'all' || rowGroup === selectedGroup);
            
            // 3. 综合判断
            if (matchesSearch && matchesGroup) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        // 搜索/筛选后，重新计算排名编号 (简化示例，实际应由后端处理)
        // renumberRankings();
    }

    searchInput.addEventListener('keyup', filterRankings);
    groupFilter.addEventListener('change', filterRankings);

    // --- 排序功能 (简化版，仅作骨架) ---
    // 这是一个非常基础的行内排序实现，用于演示。
    // 在实际项目中，建议使用成熟的表格库。
    window.sortTable = function(n) {
        let switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        switching = true;
        dir = "asc"; // 默认升序
        
        while (switching) {
            switching = false;
            
            for (i = 0; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                
                // 检查是否是数字列 (例如: 排名，积分)
                const isNumeric = (n === 0 || n === 4);
                let xContent = isNumeric ? parseFloat(x.innerHTML) : x.innerHTML.toLowerCase();
                let yContent = isNumeric ? parseFloat(y.innerHTML) : y.innerHTML.toLowerCase();

                if (dir === "asc") {
                    if (xContent > yContent) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (xContent < yContent) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                // 如果没有发生交换，且方向是 asc，则切换到 desc
                if (switchcount === 0 && dir === "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
});