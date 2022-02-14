import React from 'react';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import Latex from 'react-latex-next';
import '../../assets/stylesheets/index.css';


const Title = styled.div`
    width: 90%;
    text-align: center;
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 30px;
    font-weight: bold;
    padding: 0 10px;
    white-space: pre-wrap;
`
const Table = styled.table`
    width: 70%;
    margin: 10px auto;    
`;
const Tr1 = styled.tr`

`;
const Tr2 = styled.tr`
    background: rgb(100,100,100)
`
const Th = styled.th`
    text-align: center;
`;
const Td = styled.td`
    text-align: center;
`;
const Subtitle = styled.div`
    margin: 5px auto;
    width: 80%;
    text-align: left;
    padding-left: 10px;
    border-bottom: 1px solid black;
`;

const TexInstruction:React.VFC = () => {
    return (
        <Wrapper>
            <Title>
                Texテキストの書き方
            </Title>
            <Subtitle>
                ギリシャ文字
            </Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $A$
                        </Latex>
                    </Td>
                    <Td>
                        $A$
                    </Td>
                    <Td>
                        <Latex>
                            $\alpha$
                        </Latex>
                    </Td>
                    <Td>
                        $\alpha$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $B$
                        </Latex>
                    </Td>
                    <Td>
                        $B$
                    </Td>
                    <Td>
                        <Latex>
                            $\beta$
                        </Latex>
                    </Td>
                    <Td>
                        $\beta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Gamma$
                        </Latex>
                    </Td>
                    <Td>
                        $\Gamma$
                    </Td>
                    <Td>
                        <Latex>
                            $\gamma$
                        </Latex>
                    </Td>
                    <Td>
                        $\gamma$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Delta$
                        </Latex>
                    </Td>
                    <Td>
                        $\Delta$
                    </Td>
                    <Td>
                        <Latex>
                            $\delta$
                        </Latex>
                    </Td>
                    <Td>
                        $\delta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $E$
                        </Latex>
                    </Td>
                    <Td>
                        $E$
                    </Td>
                    <Td>
                        <Latex>
                            $\epsilon$
                        </Latex>
                    </Td>
                    <Td>
                        $\epsilon$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $Z$
                        </Latex>
                    </Td>
                    <Td>
                        $Z$
                    </Td>
                    <Td>
                        <Latex>
                            $\zeta$
                        </Latex>
                    </Td>
                    <Td>
                        $\zeta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $H$
                        </Latex>
                    </Td>
                    <Td>
                        $H$
                    </Td>
                    <Td>
                        <Latex>
                            $\eta$
                        </Latex>
                    </Td>
                    <Td>
                        $\eta$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Theta$
                        </Latex>
                    </Td>
                    <Td>
                        $\Theta$
                    </Td>
                    <Td>
                        <Latex>
                            $\theta$
                        </Latex>
                    </Td>
                    <Td>
                        $\theta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $I$
                        </Latex>
                    </Td>
                    <Td>
                        $I$
                    </Td>
                    <Td>
                        <Latex>
                            $\iota$
                        </Latex>
                    </Td>
                    <Td>
                        $\iota$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $K$
                        </Latex>
                    </Td>
                    <Td>
                        $K$
                    </Td>
                    <Td>
                        <Latex>
                            $\kappa$
                        </Latex>
                    </Td>
                    <Td>
                        $\kappa$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Lambda$
                        </Latex>
                    </Td>
                    <Td>
                        $\Lambda$
                    </Td>
                    <Td>
                        <Latex>
                            $\lambda$
                        </Latex>
                    </Td>
                    <Td>
                        $\lambda$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $M$
                        </Latex>
                    </Td>
                    <Td>
                        $M$
                    </Td>
                    <Td>
                        <Latex>
                            $\mu$
                        </Latex>
                    </Td>
                    <Td>
                        $\mu$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $N$
                        </Latex>
                    </Td>
                    <Td>
                        $N$
                    </Td>
                    <Td>
                        <Latex>
                            $\nu$
                        </Latex>
                    </Td>
                    <Td>
                        $\nu$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Xi$
                        </Latex>
                    </Td>
                    <Td>
                        $\Xi$
                    </Td>
                    <Td>
                        <Latex>
                            $\xi$
                        </Latex>
                    </Td>
                    <Td>
                        $\xi$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $O$
                        </Latex>
                    </Td>
                    <Td>
                        $O$
                    </Td>
                    <Td>
                        <Latex>
                            $o$
                        </Latex>
                    </Td>
                    <Td>
                        $o$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Pi$
                        </Latex>
                    </Td>
                    <Td>
                        $\Pi$
                    </Td>
                    <Td>
                        <Latex>
                            $\pi$
                        </Latex>
                    </Td>
                    <Td>
                        $\pi$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $P$
                        </Latex>
                    </Td>
                    <Td>
                        $P$
                    </Td>
                    <Td>
                        <Latex>
                            $\rho$
                        </Latex>
                    </Td>
                    <Td>
                        $\rho$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Sigma$
                        </Latex>
                    </Td>
                    <Td>
                        $\Sigma$
                    </Td>
                    <Td>
                        <Latex>
                            $\sigma$
                        </Latex>
                    </Td>
                    <Td>
                        $\sigma$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $T$
                        </Latex>
                    </Td>
                    <Td>
                        $T$
                    </Td>
                    <Td>
                        <Latex>
                            $\tau$
                        </Latex>
                    </Td>
                    <Td>
                        $\tau$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Upsilon$
                        </Latex>
                    </Td>
                    <Td>
                        $\Upsilon$
                    </Td>
                    <Td>
                        <Latex>
                            $\upsilon$
                        </Latex>
                    </Td>
                    <Td>
                        $\upsilon$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Phi$
                        </Latex>
                    </Td>
                    <Td>
                        $\Phi$
                    </Td>
                    <Td>
                        <Latex>
                            $\phi$
                        </Latex>
                    </Td>
                    <Td>
                        $\phi$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $X$
                        </Latex>
                    </Td>
                    <Td>
                        $X$
                    </Td>
                    <Td>
                        <Latex>
                            $\chi$
                        </Latex>
                    </Td>
                    <Td>
                        $\chi$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Psi$
                        </Latex>
                    </Td>
                    <Td>
                        $\Psi$
                    </Td>
                    <Td>
                        <Latex>
                            $\psi$
                        </Latex>
                    </Td>
                    <Td>
                        $\psi$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Omega$
                        </Latex>
                    </Td>
                    <Td>
                        $\Omega$
                    </Td>
                    <Td>
                        <Latex>
                            $\omega$
                        </Latex>
                    </Td>
                    <Td>
                        $\omega$
                    </Td>
                </Tr1>
            </Table>
            <Subtitle>
                ギリシャ文字２
            </Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\varepsilon$
                        </Latex>
                    </Td>
                    <Td>
                        $\varepsilon$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\vartheta$
                        </Latex>
                    </Td>
                    <Td>
                        $\vartheta$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\varrho$
                        </Latex>
                    </Td>
                    <Td>
                        $\varrho$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\varsigma$
                        </Latex>
                    </Td>
                    <Td>
                        $\varsigma$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\varphi$
                        </Latex>
                    </Td>
                    <Td>
                        $\varphi$
                    </Td>
                </Tr2>
            </Table>
            <Subtitle>
                単記号
            </Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\nabla$
                        </Latex>
                    </Td>
                    <Td>
                        $\nabla$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\partial$
                        </Latex>
                    </Td>
                    <Td>
                        $\partial$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\times$
                        </Latex>
                    </Td>
                    <Td>
                        $\times$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\div$
                        </Latex>
                    </Td>
                    <Td>
                        $\div$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\pm$
                        </Latex>
                    </Td>
                    <Td>
                        $\pm$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\mp$
                        </Latex>
                    </Td>
                    <Td>
                        $\mp$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\neq$
                        </Latex>
                    </Td>
                    <Td>
                        $\neq$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\sim$
                        </Latex>
                    </Td>
                    <Td>
                        $\sim$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\simeq$
                        </Latex>
                    </Td>
                    <Td>
                        $\simeq$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\fallingdotseq$
                        </Latex>
                    </Td>
                    <Td>
                        $\fallingsdotseq$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\risingdotseq$
                        </Latex>
                    </Td>
                    <Td>
                        $\risingdotseq$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\equiv$
                        </Latex>
                    </Td>
                    <Td>
                        $\equiv$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\geqq$
                        </Latex>
                    </Td>
                    <Td>
                        $\geqq$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\leqq$
                        </Latex>
                    </Td>
                    <Td>
                        $\leqq$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\gg$
                        </Latex>
                    </Td>
                    <Td>
                        $\gg$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\ll$
                        </Latex>
                    </Td>
                    <Td>
                        $\ll$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\oplus$
                        </Latex>
                    </Td>
                    <Td>
                        $\oplus$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\ominus$
                        </Latex>
                    </Td>
                    <Td>
                        $\ominus$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\otimes$
                        </Latex>
                    </Td>
                    <Td>
                        $\otimes$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\oslash$
                        </Latex>
                    </Td>
                    <Td>
                        $\oslash$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\circ$
                        </Latex>
                    </Td>
                    <Td>
                        $\circ$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\cdot$ 
                        </Latex>
                    </Td>
                    <Td>
                        $\cdot$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\cdots$
                        </Latex>
                    </Td>
                    <Td>
                        $\cdots$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\bullet$
                        </Latex>
                    </Td>
                    <Td>
                        $\bullet$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\in$
                        </Latex>
                    </Td>
                    <Td>
                        $\in$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\ni$
                        </Latex>
                    </Td>
                    <Td>
                        $\ni$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\notin$
                        </Latex>
                    </Td>
                    <Td>
                        $\notin$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\subset$
                        </Latex>
                    </Td>
                    <Td>
                        $\subset$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\supset$
                        </Latex>
                    </Td>
                    <Td>
                        $\supset$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\subseteq$
                        </Latex>
                    </Td>
                    <Td>
                        $\subseteq$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\cap$
                        </Latex>
                    </Td>
                    <Td>
                        $\cap$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\cup$
                        </Latex>
                    </Td>
                    <Td>
                        $\cup$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\emptyset$
                        </Latex>
                    </Td>
                    <Td>
                        $\emptyset$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\infty$
                        </Latex>
                    </Td>
                    <Td>
                        $\infty$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\Rightarrow$
                        </Latex>
                    </Td>
                    <Td>
                        $\Rightarrow$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\Leftrightarrow$
                        </Latex>
                    </Td>
                    <Td>
                        $\Leftrightarrow$
                    </Td>
                </Tr1>
            </Table>
            <Subtitle>数式・演算子</Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\frac{a}{b}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\frac{a}{b}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$e^x$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$e^x$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\sqrt{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\sqrt{x}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\sqrt[n]{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\sqrt[n]{x}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\log x$
                        </Latex>
                    </Td>
                    <Td>
                        $\log x$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\log_a x$
                        </Latex>
                    </Td>
                    <Td>
                        $\log_a x$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $|x|$
                        </Latex>
                    </Td>
                    <Td>
                        $|x|$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"${}_nC_r$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"${}_nC_r$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"${}_nP_r$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"${}_nP_r$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"${}_nH_r$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"${}_nH_r$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\displaystyle\\lim_{n\\to\\infty}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\displaystyle\\lim_{n\\to\\infty}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\sin x$
                        </Latex>
                    </Td>
                    <Td>
                        $\sin x$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $\cos x$
                        </Latex>
                    </Td>
                    <Td>
                        $\cos x$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            $\tan x$
                        </Latex>
                    </Td>
                    <Td>
                        $\tan x$
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\displaystyle\\sum_{i=1}^{n}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\displaystyle\\sum_{i=1}^{n}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\displaystyle\\prod_{i=1}^{n}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\displaystyle\\prod_{i=1}^{n}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\int_{a}^{b}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\int_{a}^{b}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\iint_{a}^{b}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\iint_{a}^{b}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            $a_n$
                        </Latex>
                    </Td>
                    <Td>
                        $a_n$
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\vec{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        <Latex>
                            {"$\\vec{x}$"}
                        </Latex>
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$a \\\\ b$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$a \\\\ b$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\left{ \\left[ a \\\\ b \\right] \\right\\}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\left{ \\left[ a \\\\ b \\right] \\right\\}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\begin{align} x&=3+2 \\\\ &=5 \\end{align}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\begin{align} x&=3+2 \\\\ &=5 \\end{align}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"オイラーの公式$$e^i\\theta=\\cos \\theta+ i\\sin \\theta$$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"オイラーの公式$$e^i\\theta=\\cos \\theta+ i\\sin \\theta$$"}
                    </Td>
                </Tr1>
            </Table>
            <Subtitle>文字のスタイル</Subtitle>
            <Table>
                <Tr1>
                    <Th>
                        表示
                    </Th>
                    <Th>
                        書き方
                    </Th>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\hat{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\hat{x}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\mathbb{N}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\mathbb{N}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\mathcal{N}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\mathcal{N}$"}
                    </Td>
                </Tr2>
                <Tr1>
                    <Td>
                        <Latex>
                            {"$\\mathrm{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\mathrm{x}$"}
                    </Td>
                </Tr1>
                <Tr2>
                    <Td>
                        <Latex>
                            {"$\\overline{x}$"}
                        </Latex>
                    </Td>
                    <Td>
                        {"$\\overline{x}$"}
                    </Td>
                </Tr2>
            </Table>
            
        </Wrapper>
    )
}

export default TexInstruction
